from flask import Flask
from routes.route import rrBlueprint

retailradar=Flask(__name__)
retailradar.register_blueprint(rrBlueprint)

if __name__ == '__main__':
    retailradar.run()
