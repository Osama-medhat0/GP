from flask import Flask, request, jsonify
import pandas as pd
import pickle

app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))

# Label encodings
brand_mapping = {'Suzuki': 1, 'Skoda': 2, 'Honda': 3, 'Hyundai': 4, 'Toyota': 5, 'Ford': 6, 'Renault': 7,
       'Mahindra': 8, 'Tata': 9, 'Chevrolet': 10, 'Datsun': 11, 'Jeep': 12, 'Mercedes-Benz': 13,
       'Mitsubishi': 14, 'Audi': 15, 'Volkswagen': 16, 'BMW': 17, 'Nissan': 18, 'Lexus': 19,
       'Jaguar': 20, 'Land': 21, 'MG': 22, 'Volvo': 23, 'Daewoo': 24, 'Kia': 25, 'Fiat': 26,
       'Force': 27, 'Ambassador': 28, 'Ashok': 29, 'Isuzu': 30, 'Opel': 31}

fuel_mapping = {'Diesel': 1, 'Petrol': 2}
seller_mapping = {'Individual': 1, 'Dealer': 2}
transmission_mapping = {'Manual': 1, 'Automatic': 2}
owner_mapping = {
    'First Owner': 1,
    'Second Owner': 2,
    'Third Owner': 3,
    'Fourth & Above Owner': 4,
    'Test Drive Car': 5
}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        df = pd.DataFrame([[
            brand_mapping.get(data['make'], 0),
            data['year'],
            data['mileage'],
            fuel_mapping.get(data['fuelType'], 0),
            seller_mapping.get(data['seller_type'], 1),
            transmission_mapping.get(data['transmission'], 1),
            owner_mapping.get(data.get('owner', 'First Owner'), 1),
            data.get('mileage_kmpl', 20),
            data.get('engine', 1500),
            data.get('max_power', 100),
            data.get('seats', 5)
        ]], columns=['name','year','km_driven','fuel','seller_type','transmission','owner','mileage','engine','max_power','seats'])

        prediction = model.predict(df)
        predicted_price = max(prediction[0], 0)
        egp_price = predicted_price * 0.58

        return jsonify({'predicted_price': egp_price})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8502)
