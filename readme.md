Документация по Laravel-Kit DataTable

Query Builder Eloquent
https://laravel.com/docs/12.x/queries

LengthAwarePaginator
https://laravel.com/docs/12.x/pagination

# Контроллер - UserController
- HTTP-контроллер `UserController`
- Query Builder	`$query`
- SQL-запрос `при paginate()`
- Paginator объект `$users`
- Inertia-страница `Users/Index`
- Props	`users, filters, can`

## Подключенные классы
    1) User - Eloquent модель users
    2) Request - Получение параметров из URL
    3) Inertia - Возврат React/Vue-страницы вместо Blade

## Метод index:

1. Получение парметров из URL (query string) `$perPage = $request->input('per_page', 10);`

2. Формирование запроса к базе `$query = User::query()`
    - Query Builder Eloquent
    - Запрос ещё не выполняется
    - Можно добавлять условия
    - Query Builder Eloquent -  параметров PDO для защиты вашего приложения от SQL-инъекций. Нет необходимости очищать или обрабатывать строки, передаваемые в конструктор запросов в качестве привязок.

3. Условный поиск `when`

    - ` ->when($search, function($query, $search){`
    - `     $query->where('name','like',"%$search%")`
    - `        ->orWhere('email', 'like', "%$search%");`
    - `});`

    - when() выполняется ТОЛЬКО если $search не пуст
    - Если $search = '' → этот блок пропускается
    - Поиск идёт по двум колонкам name и email
    - Используется LIKE → частичное совпадение

4. Сортировка `$query->orderBy($sort, $direction);` 

5. Пагинация `$users = $query->paginate($perPage)->withQueryString();`
    - Выполняет SQL-запрос
    - Возвращает LengthAwarePaginator
    - Включает:
        - data,
        - total,
        - links,
        - current_page,
        - last_page

   * `withQueryString()` - Сохраняет текущие параметры URL: `?search=alex&sort=email&page=2`
   * Без этого: при переходе на следующую страницу параметры пропадут

6. Возврат страницы через Inertia
    `return Inertia::render('Users/Index', [`
    Загружает React/Vue Компонент и передаёт в него напрямую props
    `resources/js/Pages/Users/Index.tsx`

7. Передаваемые данные (props)
    * Пользователи `'users' => $users,` , В React это будет :
        - `props.users.data        // массив пользователей`
        - `props.users.links       // пагинация`
        - `props.users.total`
        - `props.users.current_page`
    * Фильтры `'filters' => []`, В React это будет :
        - `const { filters } = usePage().props` 
    * Права `can => []`
        - Управление UI
        - Показывать / скрывать кнопки

