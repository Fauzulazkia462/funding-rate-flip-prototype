# App overview:
This app is about to push notification when there are signs for opening a long position.

# How to set up?

## Run the backend
1. Open a terminal in the folder `funding-rate-flip-prototype`.
2. Type `cd backend` and hit enter.
3. Type `node index.js` and hit enter.

## Run the frontend
1. Open a terminal in the folder `funding-rate-flip-prototype`.
2. Type `cd frontend` and hit enter.
3. Type `npm run dev` and hit enter.
4. By default, the frontend will run on port `5173`.

## Access the app thru the browser
1. Open a browser.
2. Head to [http://localhost:5173](http://localhost:5173).
3. Enjoy the every-ten-second notification.

# Data source

## Where is the data fetched from?
1. Go to `backend/data`
2. Find the `data.xlsx`

## How is the data being read?
1. The backend will always read the **1st row** as the one-hour-ago data.
2. The **2nd row** will always be the current data.