curl \
--header "Content-type: application/json" \
--request POST \
--data '{"password": admin, "user_email": admin@admin.com, "username": admin}' \
https://welectricity-ninja-hertz.herokuapp.com/user/create \

--data '{"user_id": 1234, "population": 1234 , "pollution": 100 , "power_demand": 1234, "plants": oil}' \
https://welectricity-ninja-hertz.herokuapp.com/game
