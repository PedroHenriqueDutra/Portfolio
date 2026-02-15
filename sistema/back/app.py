from flask import Flask,  request, jsonify
from flask_cors import CORS
from database import init_db 
import database


app = Flask(__name__)

#permitindo conexões de qualquer host
CORS(app)

#Iniciando a conexão com o bd
init_db()


#Rota inicial root
@app.route("/", methods=["GET"])
def home():
    return {"message": "Hunter System Backend Online"}

#rota para criação de um player generico
@app.route("/playergen", methods=["GET"])
def criar_player():
    database.create_player(0,1,1)
    return{"message": "Player criado"}

#rota para criação de um player real com POST
@app.route("/player", methods=["POST"])
def create_player_route():
    if not request.is_json:
        return {"error": "Requisição deve ser JSON"}, 400
    data = request.get_json()

    try:
        
        level = int(data.get("level"))
        xp = int(data.get("xp"))
        points = int(data.get("points"))
    except (TypeError, ValueError):
        return {"error": "Dados inválidos"}, 400

    database.create_player(level, xp, points)

    return {"message": "Player criado"}, 201

#recebe o player, metodo GET para obte do bd 
@app.route("/player", methods=["GET"])
def get_player_route():
    player = database.get_player()

    if player is None:
        return jsonify({"message": "Nenhum player encontrado"}), 404

    return jsonify({
        "id": player["id"],
        "level": player["level"],
        "xp": player["xp"],
        "points": player["points"]
    })

#Atualização do player com PUT
#Descontinuado substituido por um sistema de atualização automático ao alcançar o XP
@app.route("/player", methods=["PUT"])
def update_player_route():
    if not request.is_json:
        return {"error": "Requisição deve ser JSON"}, 400

    data = request.get_json()

    try:
        
        level = int(data.get("level"))
        xp = int(data.get("xp"))
        points = int(data.get("points"))
    except (TypeError, ValueError):
        return {"error": "Dados inválidos"}, 400

    database.update_player(level, xp, points)

    return {"message": "Player atualizado com sucesso"}, 200

@app.route("/player/xp", methods=["POST"])
def add_xp_route():
    if not request.is_json:
        return {"error": "Requisição deve ser JSON"}, 400

    data = request.get_json()

    try:
        amount = int(data.get("amount"))
    except (TypeError, ValueError):
        return {"error": "Valor inválido"}, 400

    result = database.add_xp(amount)

    if result is None:
        return {"error": "Player não encontrado"}, 404

    return result, 200



if __name__ == "__main__":
    app.run(debug=True)

