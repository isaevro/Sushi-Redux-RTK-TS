# Магазин суши

Изпользованы технологии: React, Typescript, Redux, Redux ToolKit, RTK Query, Scss
Краткое описание:
Получение json с товарами, на его основе отрисовка карточек товаров. Сортировка товаров осуществляется на стороне сервера, мы отправляем запрос с требуемой фильтраций, нам приходит новый список, если запросы повторяются RTK Query кэширует ранее полученные результаты.
При добавлении товаров в корзину, на стороне клиента добавленные товары передаются в Store, ими в дальнейшем можно манипулировать добавлять/удалять, функционал реализован с помощью Redux ToolKit и слайсов.
Верстка была взята с ютуба первоначально там была пицца а не суши, пришлось заменить все переменные, картинки, текст, пофиксить некоторые баги. Первоначально писал на JS в дальнейшем переписал на TS.
