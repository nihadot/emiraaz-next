# Chat Components

This directory contains all the chat-related components for the AI Agent chat feature.

## Component Structure

### Main Components

- **ChatPopup.tsx** - Main chat popup component that orchestrates the chat UI
- **ChatTrigger.tsx** - Button to trigger the chat popup
- **ChatWidget.tsx** - Widget wrapper component

### Layout Components

- **MobileChatLayout.tsx** - Mobile-specific chat layout with full-screen view
- **MobileHero.tsx** - Hero section displayed when chat is empty (mobile)
- **MobileFeatureCard.tsx** - Feature card component for mobile hero section

### UI Components

- **ControlButtons.tsx** - Window control buttons (minimize, maximize, close)
- **WelcomeHeroSection.tsx** - Welcome section for desktop empty state
- **SuggestionQuestion.tsx** - Suggestion chip component
- **ChatSection.tsx** - Chat input section with clear button
- **InputField.tsx** - Reusable input field with send button
- **ChatReplaySection.tsx** - Message display component
- **ChatBubble.tsx** - Individual chat bubble component
- **ChatContainer.tsx** - Container for chat messages
- **QuickActionButton.tsx** - Quick action button component
- **MobileControl.tsx** - Mobile-specific controls

### Hooks

- **useChatLogic.ts** - Custom hook that manages all chat logic including:
  - Socket connection and event handlers
  - Message sending and receiving
  - Streaming response support
  - Input handling and validation
  - Auto-scroll functionality

## Usage

### Import Components

```tsx
// Import individual components
import { ChatPopup, MobileChatLayout, ChatReplaySection } from '@/components/Chat';

// Or import the main component
import ChatPopup from '@/components/Chat/ChatPopup';
```

### Example Usage

```tsx
// Main chat popup
<ChatPopup />

// Using the chat logic hook in a custom component
import { useChatLogic } from '@/components/Chat';

function MyCustomChat() {
  const {
    data,
    search,
    isLoading,
    topRef,
    onSent,
    handleChange,
    handleKeyDown,
    clearSearch,
  } = useChatLogic();

  return (
    <div>
      {/* Your custom chat UI */}
    </div>
  );
}

// Mobile chat layout
<MobileChatLayout
  data={data}
  isLoading={isLoading}
  search={search}
  handleChange={handleChange}
  handleKeyDown={handleKeyDown}
  onSent={onSent}
  topRef={topRef}
  dispatch={dispatch}
/>

// Chat replay section
<ChatReplaySection
  data={data}
  isLoading={isLoading}
  small={false}
/>
```

## Component Props

### ChatPopup
No props required - uses Redux for state management

### MobileChatLayout
- `data` - Chat conversation data
- `isLoading` - Loading state
- `search` - Current search/input value
- `handleChange` - Input change handler
- `handleKeyDown` - Keyboard event handler
- `onSent` - Send message handler
- `topRef` - Ref for scroll container
- `dispatch` - Redux dispatch function

### ChatReplaySection
- `data` - Chat conversation data with `conversations` array
- `isLoading` - Loading state
- `small` - Optional boolean for compact view

### ControlButtons
- `isClose` - Show close button
- `isMinus` - Show minus button
- `isMinimize` - Show minimize button
- `isFullScreen` - Show fullscreen button
- `onMinimize` - Minimize handler
- `onMaximize` - Maximize handler
- `onClose` - Close handler

### InputField
- `small` - Optional boolean for compact view
- `handleKeyDown` - Keyboard event handler
- `handleChange` - Input change handler
- `search` - Current input value
- `onSent` - Send message handler
- `isLoading` - Loading state

## State Management

The chat components use Redux for state management:
- `chatSlice` - Manages chat open/close/minimize state
- `socketSlice` - Manages WebSocket connection

## Styling

All components use:
- Tailwind CSS for styling
- `clsx` for conditional classes
- Poppins font family
- Brand color: `#FF1645`

## Responsive Design

- Mobile: Full-screen chat with custom header
- Desktop: Modal-based chat with window controls
- Minimized: Compact chat widget in bottom-right corner
