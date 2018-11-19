from sqlalchemy import create_engine
from sqlalchemy import sql

from BarBeerDrinker import config

engine = create_engine(config.database_uri)

def get_bars():
    with engine.connect() as con:
        rs = con.execute("SELECT name, license, city, phone, address FROM bars;")
        return [dict(row) for row in rs]

def find_bar(name):
    with engine.connect() as con:
        query = sql.text(
            "SELECT name, license, city, phone, address FROM bars WHERE name = :name;"
        )

        rs = con.execute(query, name=name)
        result = rs.first()
        if result is None:
            return None
        return dict(result)

def filter_beers(max_price):
    with engine.connect() as con:
        query = sql.text(
            "SELECT * FROM sells WHERE price < :max_price;"
        )

        rs = con.execute(query, max_price=max_price)
        results = [dict(row) for row in rs]
        for r in results:
            r['price'] = float(r['price'])
        return results


def get_bar_menu(bar_name):
    with engine.connect() as con:
        query = sql.text(
            'SELECT a.bar, a.item, a.price, b.manf, coalesce(c.like_count, 0) as likes \
                FROM sells as a \
                JOIN items AS b \
                ON a.item = b.name \
                LEFT OUTER JOIN (SELECT item, count(*) as like_count FROM likes GROUP BY item) as c \
                ON a.item = c.item \
                WHERE a.bar = :bar \
                ORDER BY b.manf; \
            ')
        rs = con.execute(query, bar=bar_name)
        results = [dict(row) for row in rs]
        for i, _ in enumerate(results):
            results[i]['price'] = float(results[i]['price'])
        return results


def get_bars_selling(item):
    with engine.connect() as con:
        query = sql.text('SELECT a.bar, a.price, b.customers \
                FROM sells AS a \
                JOIN (SELECT bar, count(*) AS customers FROM frequents GROUP BY bar) as b \
                ON a.bar = b.bar \
                WHERE a.item = :item \
                ORDER BY a.price; \
            ')
        rs = con.execute(query, item=item)
        results = [dict(row) for row in rs]
        for i, _ in enumerate(results):
            results[i]['price'] = float(results[i]['price'])
        return results


def get_bar_frequent_counts():
    with engine.connect() as con:
        query = sql.text('SELECT bar, count(*) as frequentCount \
                FROM frequents \
                GROUP BY bar; \
            ')
        rs = con.execute(query)
        results = [dict(row) for row in rs]
        return results


def get_bar_cities():
    with engine.connect() as con:
        rs = con.execute('SELECT DISTINCT city FROM bars;')
        return [row['city'] for row in rs]


def get_items():
    """Gets a list of beer names from the beers table."""

    with engine.connect() as con:
        rs = con.execute('SELECT name, manf FROM items;')
        return [dict(row) for row in rs]


def get_item_manufacturers(item):
    with engine.connect() as con:
        if item is None:
            rs = con.execute('SELECT DISTINCT manf FROM items;')
            return [row['manf'] for row in rs]

        query = sql.text('SELECT manf FROM items WHERE name = :item;')
        rs = con.execute(query, item=item)
        result = rs.first()
        if result is None:
            return None
        return result['manf']

def get_bar_top_spenders(bar_name):
    with engine.connect() as con:
        query = sql.text("SELECT drinker, CAST(SUM(price+tip) as UNSIGNED) as spent FROM bills INNER JOIN transactions ON bills.trans_id=transactions.trans_id WHERE bar=:bar GROUP BY drinker ORDER BY spent DESC")
        rs = con.execute(query, bar=bar_name)
        return [dict(row) for row in rs]


def get_bar_top_beers(bar_name):
    with engine.connect() as con:
        query = sql.text("SELECT contains.item, SUM(contains.quantity) AS count FROM transactions INNER JOIN contains ON transactions.trans_id=contains.trans_id WHERE contains.item IN (SELECT name FROM items WHERE manf <> '') AND transactions.bar=:bar GROUP BY item ORDER BY count DESC")
        rs = con.execute(query, bar=bar_name)
        results = [dict(row) for row in rs]
        for r in results:
            r['count'] = int(r['count'])
        return results

def get_bar_top_manufacturers(bar_name):
    with engine.connect() as con:
        query = sql.text("SELECT manf, CAST(SUM(c) as UNSIGNED)  as count FROM (SELECT contains.item, SUM(contains.quantity) AS c FROM transactions INNER JOIN contains ON transactions.trans_id=contains.trans_id WHERE contains.item IN (SELECT name FROM items WHERE manf <> '') AND transactions.bar=:bar GROUP BY item ORDER BY c DESC) T INNER JOIN items ON T.item=items.name GROUP BY items.manf ORDER BY count DESC")
        rs = con.execute(query, bar=bar_name)
        results = [dict(row) for row in rs]
        for r in results:
            r['count'] = int(r['count'])
            return results

def get_drinkers():
    with engine.connect() as con:
        rs = con.execute('SELECT name, city, phone, address FROM drinkers;')
        return [dict(row) for row in rs]


def get_likes(drinker_name):
    """Gets a list of beers liked by the drinker provided."""

    with engine.connect() as con:
        query = sql.text('SELECT item FROM likes WHERE drinker = :name;')
        rs = con.execute(query, name=drinker_name)
        return [row['item'] for row in rs]


def get_drinker_info(drinker_name):
    with engine.connect() as con:
        query = sql.text('SELECT * FROM drinkers WHERE name = :name;')
        rs = con.execute(query, name=drinker_name)
        result = rs.first()
        if result is None:
            return None
        return dict(result)