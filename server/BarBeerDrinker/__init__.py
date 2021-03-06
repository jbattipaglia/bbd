from flask import Flask
from flask import jsonify
from flask import make_response
from flask import request
import json

from BarBeerDrinker import database

app = Flask(__name__)

@app.route('/api/bar', methods=["GET"])
def get_bars():
    return jsonify(database.get_bars())

@app.route('/api/bar/topspenders/<name>', methods=["GET"])
def get_bar_top_spenders(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified")
        results = database.get_bar_top_spenders(name)
        if results is None:
            return make_response("No bar found with the given name", 404)
        return jsonify(results)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/bar/<name>", methods=["GET"])
def find_bar(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        bar = database.find_bar(name)
        if bar is None:
            return make_response("No bar found with the given name.", 404)
        return jsonify(bar)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/beers_cheaper_than", methods=["POST"])
def find_beers_cheaper_than():
    body = json.loads(request.data)
    max_price = body['maxPrice']
    return jsonify(database.filter_beers(max_price))


@app.route('/api/menu/<name>', methods=['GET'])
def get_menu(name):
    try:
        if name is None:
            raise ValueError('Bar is not specified.')
        bar = database.find_bar(name)
        if bar is None:
            return make_response("No bar found with the given name.", 404)
        return jsonify(database.get_bar_menu(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/bar-cities", methods=["GET"])
def get_bar_cities():
    try:
        return jsonify(database.get_bar_cities())
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/item", methods=["GET"])
def get_items():
    try:
        return jsonify(database.get_items())
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/item-manufacturer", methods=["GET"])
def get_item_manufacturers():
    try:
        return jsonify(database.get_item_manufacturers(None))
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/beer-manufacturer/<beer>", methods=["GET"])
def get_manufacturers_making(beer):
    try:
        return jsonify(database.get_item_manufacturers(beer))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/bar/topbeers/<name>', methods=["GET"])
def get_bar_top_beers(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified")
        results = database.get_bar_top_beers(name)
        if results is None:
            return make_response("No bar found with the given name", 404)
        return jsonify(results)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/bar/topmanufacturers/<name>', methods=["GET"])
def get_bar_top_manufacturers(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified")
        results = database.get_bar_top_manufacturers(name)
        if results is None:
            return make_response("No bar found with the given name", 404)
        return jsonify(results)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/beer/topbars/<name>', methods=["GET"])
def get_beer_top_bars(name):
    try:
        if name is None:
            raise ValueError("Beer is not specified")
        results = database.get_beer_top_bars(name)
        if results is None:
            return make_response("No bars found that sell this beer", 404)
        return jsonify(results)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/beer/topdrinkers/<name>', methods=["GET"])
def get_beer_top_drinkers(name):
    try:
        if name is None:
            raise ValueError("Beer is not specified")
        results = database.get_beer_top_drinkers(name)
        if results is None:
            return make_response("No drinkers found of this beer", 404)
        return jsonify(results)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/bar/busyhours/<name>', methods=["GET"])
def get_bar_busy_hours(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified")
        results = database.get_bar_busy_hours(name)
        if results is None:
            return make_response("No times found", 404)
        return jsonify(results)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/beer/peaktimes/<name>', methods=["GET"])
def get_beer_peak_times(name):
    try:
        if name is None:
            raise ValueError("Beer is not specified")
        results = database.get_beer_peak_times(name)
        if results is None:
            return make_response("No times found", 404)
        return jsonify(results)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/likes", methods=["GET"])
def get_likes():
    try:
        drinker = request.args.get("drinker")
        if drinker is None:
            raise ValueError("Drinker is not specified.")
        return jsonify(database.get_likes(drinker))
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/drinkers", methods=["GET"])
def get_all_drinkers():
    try:
        return jsonify(database.get_all_drinkers())
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/drinker", methods=["GET"])
def get_drinkers():
    try:
        return jsonify(database.get_drinkers())
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/drinker/<name>", methods=["GET"])
def get_drinker(name):
    try:
        if name is None:
            raise ValueError("Drinker is not specified.")
        return jsonify(database.get_drinker_info(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/drinker/transactions/<drinker>', methods=["GET"])
def get_drinker_transactions(drinker):
    try:
        if drinker is None:
            raise ValueError('Drinker not specified')
        return jsonify(database.get_drinker_transactions(drinker))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/drinker/transactions/bars/<drinker>', methods=["GET"])
def get_drinker_top_bars(drinker):
    try:
        if drinker is None:
            raise ValueError('Drinker not specified')
        return jsonify(database.get_drinker_top_bars(drinker))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/drinker/transactions/beers/<drinker>', methods=["GET"])
def get_drinker_top_beers(drinker):
    try:
        if drinker is None:
            raise ValueError('Drinker not specified')
        return jsonify(database.get_drinker_top_beers(drinker))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/drinker/transactions/times/<drinker>', methods=["GET"])
def get_drinker_time_spending(drinker):
    try:
        if drinker is None:
            raise ValueError('Drinker not specified')
        return jsonify(database.get_drinker_time_spending(drinker))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/bars-selling/<beer>', methods=['GET'])
def find_bars_selling(beer):
    try:
        if beer is None:
            raise ValueError('Beer not specified')
        return jsonify(database.get_bars_selling(beer))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/modification/<modification>', methods=['GET'])
def modify(modification):
    try:
        if modification is None:
            raise ValueError('No modification specified')
        return jsonify(database.modify(modification))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/frequents-data', methods=['GET'])
def get_bar_frequent_counts():
    try:
        return jsonify(database.get_bar_frequent_counts())
    except Exception as e:
        return make_response(str(e), 500)