# Todo List aplication

> Minimal starter with hot module replacement (HMR) for rapid development.

- **[React](https://facebook.github.io/react/)** (18.x)
- **[Webpack](https://webpack.js.org/)** (5.x)
- **[Typescript](https://www.typescriptlang.org/)** (4.x)
- Production build script
- Formatting
  ([Prettier](https://github.com/prettier/prettier))
- **[Ant.Design v5](https://ant.design/)**

## Installation

1. Clone/download repo
2. `npm install`

## Usage

**Development**

`npm start`

- Build app continuously (HMR enabled)
- App served @ `http://localhost:3000`

**Production**

`npm run build`

- Build app once (HMR disabled) to `/dist/`


## Основные возможности приложения:

1. Создание задачи на выбранную дату
2. Редактирование задачи через редактор в модальном окне
3. Удаление уже созданных задач с подтверждением от пользователя
4. Возможность отмечать задачу как выполненную или наоборот — как не выполненную
5. Выбор типа периода, за который отображаются задачи (День, Неделя, Месяц)
6. Изменение периода, за который отображаются, в зависимости от выбранного типа периода (День,
Неделя, Месяц)
7. Возможность скрыть или показать выполненные задачи
8. Список созданных задач может храниться в памяти вкладки, и допускается потеря данных при закрытии
вкладки
9. Если приложение открыто в нескольких вкладках - допускается отсутствие согласованности данных