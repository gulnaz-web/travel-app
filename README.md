# Travel App

Next.js приложение со структурой Feature-Sliced Design

> Основано на официальной документации: [FSD + Next.js](https://feature-sliced.github.io/documentation/ru/docs/guides/tech/with-nextjs)

## Структура проекта (FSD + Next.js App Router)

```
├── app/                             # Next.js App Router (только роутинг)
│   ├── layout.tsx                   # Ре-экспорт из @/app/root-layout
│   ├── page.tsx                     # Ре-экспорт HomePage
│   ├── explore/
│   │   └── page.tsx                 # Ре-экспорт ExplorePage
│   ├── place/
│   │   └── [slug]/
│   │       └── page.tsx             # Ре-экспорт PlacePage
│   └── profile/
│       └── page.tsx                 # Ре-экспорт ProfilePage
│
├── pages/                           # Пустая папка (Next.js)
│   └── README.md                    
│
└── src/
    ├── app/                          # FSD: Инициализация приложения
    │   ├── root-layout/
    │   │   ├── ui/
    │   │   │   └── RootLayout.tsx   # Кастомный Layout
    │   │   └── index.ts
    │   └── styles/                   # Глобальные стили
    │       ├── _variables.scss
    │       └── globals.scss
    │
    ├── pages/                        # FSD: Страничные компоненты
    │   ├── home/
    │   │   ├── ui/
    │   │   │   └── HomePage.tsx
    │   │   └── index.ts
    │   ├── place/
    │   │   ├── ui/
    │   │   │   └── PlacePage.tsx
    │   │   ├── model/
    │   │   └── index.ts
    │   ├── explore/
    │   │   ├── ui/
    │   │   │   └── ExplorePage.tsx
    │   │   └── index.ts
    │   └── profile/
    │       ├── ui/
    │       │   └── ProfilePage.tsx
    │       └── index.ts
    │
    ├── widgets/                      # FSD: Сложные UI блоки
    │   ├── place-card/
    │   │   ├── ui/
    │   │   │   ├── PlaceCard.tsx
    │   │   │   └── PlaceCard.module.scss
    │   │   └── index.ts
    │   └── header/
    │       ├── ui/
    │       └── index.ts
    │
    ├── features/                     # FSD: Функциональности
    │   ├── place-favorite/
    │   │   ├── ui/
    │   │   │   └── FavoriteButton.tsx
    │   │   ├── model/
    │   │   └── index.ts
    │   └── auth/
    │       ├── ui/
    │       ├── model/
    │       └── index.ts
    │
    ├── entities/                     # FSD: Бизнес-сущности
    │   ├── place/
    │   │   ├── ui/
    │   │   ├── model/
    │   │   ├── api/
    │   │   └── index.ts
    │   └── user/
    │       ├── ui/
    │       ├── model/
    │       ├── api/
    │       └── index.ts
    │
    └── shared/                       # FSD: Переиспользуемый код
        ├── ui/                       # UI kit
        │   ├── footer/
        │   │   ├── Footer.tsx
        │   │   ├── Footer.module.scss
        │   │   └── index.ts
        │   ├── button/
        │   ├── input/
        │   └── index.ts
        ├── api/                      # API клиент
        │   └── client.ts
        ├── lib/                      # Утилиты
        │   └── utils.ts
        └── config/                   # Конфигурация
            └── constants.ts
```

## Почему такая структура?

### Проблема
Next.js ожидает файлы роутинга в папках `app/` или `pages/` в корне проекта. Но FSD использует слои `app` и `pages` внутри `src/` для другого — организации бизнес-логики.

### Решение
1. **Корневая `app/`** — только Next.js роутинг (минимум кода, только ре-экспорты)
2. **Корневая `pages/`** — пустая папка с README (чтобы Next.js не искал роуты в `src/pages`)
3. **`src/`** — вся FSD структура со слоями

## Принципы работы FSD + Next.js

### 1. Next.js файлы (корень `app/`) - только ре-экспорты

```tsx
// ✅ app/page.tsx
export { HomePage as default } from '@/pages/home'

// ✅ app/place/[slug]/page.tsx
import { PlacePage } from '@/pages/place'

export default function Page({ params }: { params: { slug: string } }) {
  return <PlacePage slug={params.slug} />
}

// ✅ app/layout.tsx
export { RootLayout as default, metadata } from '@/app/root-layout'
```

### 2. FSD компоненты (`src/pages/`) - вся логика

### 2. Правила импортов (FSD иерархия)

```
app → pages → widgets → features → entities → shared
```

**Можно:**
- `pages` → `widgets`, `features`, `entities`, `shared`
- `widgets` → `features`, `entities`, `shared`
- `features` → `entities`, `shared`
- `entities` → `shared`
- `shared` → ничего

**Нельзя:**
- `shared` → `entities`, `features`, `widgets`, `pages`, `app`
- `features` → `widgets`, `pages`, `app`
- и т.д. (нижний слой не может импортировать верхний)

### 3. Public API (index.ts)
Каждый слайс экспортирует через `index.ts`:

```ts
// pages/home/index.ts
export { HomePage } from './ui/HomePage'

// features/place-favorite/index.ts
export { FavoriteButton } from './ui/FavoriteButton'
export { useFavorites } from './model/useFavorites'
```

### 4. Изоляция стилей
Каждый компонент имеет свои CSS модули:

```tsx
// shared/ui/footer/Footer.tsx
import styles from './Footer.module.scss'
```

## Команды

```bash
npm run dev          # Запуск dev сервера
npm run build        # Сборка продакшн
npm run lint         # Проверка ESLint
npm run lint:fix     # Автофикс ESLint
npm run format       # Форматирование Prettier
npm run fsd:check    # Проверка FSD структуры (Steiger)
```

## ESLint правила FSD

В проекте настроены автоматические проверки:
- ✅ Запрет импортов вышестоящих слоев
- ✅ Одинарные кавычки
- ✅ Без точек с запятой
- ✅ Tab = 2 пробела
- ✅ Автофикс при сохранении

## Технологии

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **SCSS** + CSS Modules
- **Feature-Sliced Design**
- **ESLint** + **Prettier**
- **Steiger** (FSD валидация)

