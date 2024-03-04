from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data['message']

    bot_response = f"Bot: You said '{user_message}'"

    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)