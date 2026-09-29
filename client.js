window.__ModuleLoader__.load({
  id: 'dsh-sanrio-skin',
  factory(require) {
    const React = require('react')
    const PACKAGE = 'dsh-sanrio-skin'
    const ASSET_ROOT = '/sanrio-skin-assets/'
    const PET_POSITION_KEY = 'dsh-sanrio-skin.pet-position.v1'
    const characters = [
      { id: 'pudding', image: 'pudding/mascot.gif', brand: 'pudding/brand.png', peek: 'pudding/peek.png', friends: Array.from({ length: 15 }, (_, i) => `pudding/friends/${String(i).padStart(2, '0')}.png`) },
      { id: 'kitty', image: 'hello-kitty/mascot.gif', brand: 'hello-kitty/brand.png', peek: 'hello-kitty/peek.png', friends: Array.from({ length: 12 }, (_, i) => `hello-kitty/friends/${String(i).padStart(2, '0')}.png`) },
      { id: 'kuromi', image: 'kuromi/mascot.gif', brand: 'kuromi/brand.png', peek: 'kuromi/peek.png', friends: Array.from({ length: 11 }, (_, i) => `kuromi/friends/${String(i).padStart(2, '0')}.png`) },
      { id: 'cinna', image: 'cinnamoroll/mascot.png', brand: 'cinnamoroll/brand.png', peek: 'cinnamoroll/peek.png', friends: [0, 7, 1, 8, 2, 9, 3, 4, 5, 6].map(i => `cinnamoroll/friends/${String(i).padStart(2, '0')}.png`) },
    ]
    // Every character covers the same DSH token set in both light and dark modes.
    // Light surfaces stay quiet; character colors carry actions and selected states.
    const palettes = {
      pudding: {
        '--dsw-alias-brand-primary': { light: '#85534a', dark: '#e7bf83' },
        '--dsw-alias-brand-text': { light: '#fffaf3', dark: '#2b2421' },
        '--dsw-alias-bg-base': { light: '#fcf9f2', dark: '#1c1b1c' },
        '--dsw-alias-bg-layer-1': { light: '#fffcf7', dark: '#252325' },
        '--dsw-alias-bg-layer-2': { light: '#f6efe3', dark: '#2d2a2b' },
        '--dsw-alias-bg-layer-3': { light: '#efe5d5', dark: '#363132' },
        '--dsw-alias-bg-overlay': { light: '#fffdf9', dark: '#3a3434' },
        '--dsw-alias-label-primary': { light: '#403631', dark: '#f4ede3' },
        '--dsw-alias-label-secondary': { light: '#776a61', dark: '#c2b7ac' },
        '--dsw-alias-label-tertiary': { light: '#9f9183', dark: '#9c9087' },
        '--dsw-alias-border-l1': { light: '#e8dfd2', dark: '#413b3b' },
        '--dsw-alias-border-l2': { light: '#dacbbb', dark: '#574d4a' },
        '--dsw-alias-interactive-bg-hover': { light: '#f5ead9', dark: '#342f2e' },
        '--dsw-alias-interactive-bg-active': { light: '#eddbc2', dark: '#463a35' },
        '--dsw-alias-interactive-bg-hover-solid': { light: '#f2e5d1', dark: '#393332' },
        '--dsw-alias-button-primary-fill': { light: '#85534a', dark: '#e7bf83' },
        '--dsw-alias-button-primary-hover': { light: '#70433c', dark: '#f1cf99' },
        '--dsw-alias-state-error-primary': { light: '#cf5b45', dark: '#e08463' },
        '--dsw-alias-state-warn-primary': { light: '#c6914c', dark: '#d9ad70' },
        '--dsw-alias-state-success-primary': { light: '#74b06a', dark: '#7bbf75' },
        '--dsw-specific-sidebar-fill': { light: '#f6f0e7', dark: '#252325' },
        '--dsw-alias-scrollbar-bg-l1': { light: '#d8b998', dark: '#5e5552' },
        '--dsw-alias-scrollbar-hover-l1': { light: '#bc9874', dark: '#786c66' },
        '--dsw-alias-brand-primary-new-colorprimary-new-color': { light: '#85534a', dark: '#e7bf83' },
        '--dsw-alias-state-business-primary': { light: '#85534a', dark: '#e7bf83' },
        '--dsw-alias-state-business-tertiary': { light: '#f2e6d7', dark: '#453832' },
        '--dsw-alias-button-info-fill': { light: '#85534a', dark: '#e7bf83' },
        '--dsw-alias-button-info-hover': { light: '#70433c', dark: '#f1cf99' },
        '--dsw-alias-interactive-bg-hover-accent': { light: '#edddc9', dark: '#463a35' },
        '--dsw-specific-bubble': { light: '#f8efe1', dark: '#292627' },
        '--dsw-specific-bubble-highlight': { light: '#f0dec3', dark: '#39302e' },
        '--dsw-specific-sidebar-nav-item-active-accent': { light: '#eee1cd', dark: '#493830' },
        '--dsw-specific-sidebar-nav-item-active': { light: '#f2e8d8', dark: '#393130' },
        '--dsw-specific-sidebar-nav-item-hover': { light: '#f6eddf', dark: '#302b2b' },
        '--dsw-specific-tip': { light: '#f3e9da', dark: '#332e2d' },
        '--dsw-alias-link': { light: '#85534a', dark: '#e7bf83' },
        '--dsw-alias-markdown-citation': { light: '#f3e6d6', dark: '#342e2c' },
        '--dsw-alias-markdown-inline-code': { light: '#f3e9dc', dark: '#332e2d' },
        '--dsw-alias-markdown-placeholder': { light: '#f5ecdf', dark: '#302c2c' },
        '--dsw-alias-markdown-tag': { light: '#f4e9da', dark: '#302c2c' },
        '--dsw-alias-toast-bg': { light: '#55413a', dark: '#3a3130' },
        '--dsw-alias-tooltip-bg': { light: '#55413a', dark: '#3a3130' },
        '--shiki-token-constant': { light: '#85534a', dark: '#e7bf83' },
        '--shiki-token-link': { light: '#9a6151', dark: '#f1cf99' },
      },
      kitty: {
        '--dsw-alias-brand-primary': { light: '#b74651', dark: '#ed929a' },
        '--dsw-alias-brand-text': { light: '#fffaf9', dark: '#291f23' },
        '--dsw-alias-bg-base': { light: '#fcf9f8', dark: '#1d1b1d' },
        '--dsw-alias-bg-layer-1': { light: '#fffdfc', dark: '#262326' },
        '--dsw-alias-bg-layer-2': { light: '#f7eff0', dark: '#2e292d' },
        '--dsw-alias-bg-layer-3': { light: '#f2e4e6', dark: '#393035' },
        '--dsw-alias-bg-overlay': { light: '#fffafa', dark: '#3b3337' },
        '--dsw-alias-label-primary': { light: '#3e3437', dark: '#f4ecee' },
        '--dsw-alias-label-secondary': { light: '#74696d', dark: '#c5b7ba' },
        '--dsw-alias-label-tertiary': { light: '#9f9296', dark: '#a49398' },
        '--dsw-alias-border-l1': { light: '#e7dcde', dark: '#42383d' },
        '--dsw-alias-border-l2': { light: '#d9c9cd', dark: '#56474d' },
        '--dsw-alias-interactive-bg-hover': { light: '#f5e9ec', dark: '#342b30' },
        '--dsw-alias-interactive-bg-active': { light: '#ecd6dc', dark: '#49363e' },
        '--dsw-alias-interactive-bg-hover-solid': { light: '#f1e1e5', dark: '#3d3137' },
        '--dsw-alias-button-primary-fill': { light: '#b74651', dark: '#ed929a' },
        '--dsw-alias-button-primary-hover': { light: '#9f3543', dark: '#f4a7ae' },
        '--dsw-alias-state-error-primary': { light: '#bf4c54', dark: '#ed848a' },
        '--dsw-alias-state-warn-primary': { light: '#ba884e', dark: '#d4ab77' },
        '--dsw-alias-state-success-primary': { light: '#628f74', dark: '#8cb99b' },
        '--dsw-specific-sidebar-fill': { light: '#f1e8ea', dark: '#272428' },
        '--dsw-alias-scrollbar-bg-l1': { light: '#cfb1b7', dark: '#62565b' },
        '--dsw-alias-scrollbar-hover-l1': { light: '#bb919a', dark: '#7b666d' },
        '--dsw-alias-brand-primary-new-colorprimary-new-color': { light: '#b74651', dark: '#ed929a' },
        '--dsw-alias-state-business-primary': { light: '#b74651', dark: '#ed929a' },
        '--dsw-alias-state-business-tertiary': { light: '#f2dfe3', dark: '#4b343d' },
        '--dsw-alias-button-info-fill': { light: '#b74651', dark: '#ed929a' },
        '--dsw-alias-button-info-hover': { light: '#9f3543', dark: '#f4a7ae' },
        '--dsw-alias-interactive-bg-hover-accent': { light: '#f1dfe3', dark: '#433039' },
        '--dsw-specific-bubble': { light: '#f7edef', dark: '#2c272b' },
        '--dsw-specific-bubble-highlight': { light: '#efdee2', dark: '#3b3035' },
        '--dsw-specific-sidebar-nav-item-active-accent': { light: '#ead4d9', dark: '#483238' },
        '--dsw-specific-sidebar-nav-item-active': { light: '#f0e3e6', dark: '#382c32' },
        '--dsw-specific-sidebar-nav-item-hover': { light: '#f5eaed', dark: '#30282c' },
        '--dsw-specific-tip': { light: '#f2e6e8', dark: '#32292d' },
        '--dsw-alias-link': { light: '#9e3545', dark: '#f2a1aa' },
        '--dsw-alias-markdown-citation': { light: '#f2e2e6', dark: '#3b3035' },
        '--dsw-alias-markdown-inline-code': { light: '#f3e8ea', dark: '#332b2f' },
        '--dsw-alias-markdown-placeholder': { light: '#f4ebec', dark: '#30292d' },
        '--dsw-alias-markdown-tag': { light: '#f1e4e7', dark: '#32292e' },
        '--dsw-alias-toast-bg': { light: '#4b343b', dark: '#40343a' },
        '--dsw-alias-tooltip-bg': { light: '#4b343b', dark: '#40343a' },
        '--shiki-token-constant': { light: '#a84049', dark: '#ef9299' },
        '--shiki-token-link': { light: '#b05059', dark: '#f2adb1' },
      },
      kuromi: {
        '--dsw-alias-brand-primary': { light: '#805b88', dark: '#d3a5d2' },
        '--dsw-alias-brand-text': { light: '#fffafc', dark: '#261f29' },
        '--dsw-alias-bg-base': { light: '#faf9fb', dark: '#1d1b21' },
        '--dsw-alias-bg-layer-1': { light: '#fffefd', dark: '#26232b' },
        '--dsw-alias-bg-layer-2': { light: '#f4f0f5', dark: '#302b35' },
        '--dsw-alias-bg-layer-3': { light: '#eae3ed', dark: '#3a333f' },
        '--dsw-alias-bg-overlay': { light: '#fcfafc', dark: '#403844' },
        '--dsw-alias-label-primary': { light: '#342e39', dark: '#f3eef5' },
        '--dsw-alias-label-secondary': { light: '#736a7c', dark: '#c4b8c9' },
        '--dsw-alias-label-tertiary': { light: '#96899e', dark: '#a493ad' },
        '--dsw-alias-border-l1': { light: '#e4dfe7', dark: '#403844' },
        '--dsw-alias-border-l2': { light: '#d4c9d9', dark: '#594e60' },
        '--dsw-alias-interactive-bg-hover': { light: '#f0e8f2', dark: '#342b39' },
        '--dsw-alias-interactive-bg-active': { light: '#e5d6e9', dark: '#47374c' },
        '--dsw-alias-interactive-bg-hover-solid': { light: '#eadeee', dark: '#3d3043' },
        '--dsw-alias-button-primary-fill': { light: '#805b88', dark: '#d3a5d2' },
        '--dsw-alias-button-primary-hover': { light: '#6f4a79', dark: '#e2b8df' },
        '--dsw-alias-state-error-primary': { light: '#b95d79', dark: '#e392a8' },
        '--dsw-alias-state-warn-primary': { light: '#b58b57', dark: '#d8b77c' },
        '--dsw-alias-state-success-primary': { light: '#67927f', dark: '#8fc1a7' },
        '--dsw-specific-sidebar-fill': { light: '#efedf3', dark: '#28252e' },
        '--dsw-alias-scrollbar-bg-l1': { light: '#c3b2c9', dark: '#66586d' },
        '--dsw-alias-scrollbar-hover-l1': { light: '#a991b4', dark: '#83718b' },
        '--dsw-alias-brand-primary-new-colorprimary-new-color': { light: '#805b88', dark: '#d3a5d2' },
        '--dsw-alias-state-business-primary': { light: '#805b88', dark: '#d3a5d2' },
        '--dsw-alias-state-business-tertiary': { light: '#eadceb', dark: '#47384b' },
        '--dsw-alias-button-info-fill': { light: '#805b88', dark: '#d3a5d2' },
        '--dsw-alias-button-info-hover': { light: '#6f4a79', dark: '#e2b8df' },
        '--dsw-alias-interactive-bg-hover-accent': { light: '#eaddeb', dark: '#423549' },
        '--dsw-specific-bubble': { light: '#f1e9f3', dark: '#2d2732' },
        '--dsw-specific-bubble-highlight': { light: '#e5d6e9', dark: '#413447' },
        '--dsw-specific-sidebar-nav-item-active-accent': { light: '#e7dbe9', dark: '#47384d' },
        '--dsw-specific-sidebar-nav-item-active': { light: '#eee5f0', dark: '#39303d' },
        '--dsw-specific-sidebar-nav-item-hover': { light: '#f3edf5', dark: '#322b37' },
        '--dsw-specific-tip': { light: '#f0eaf2', dark: '#332c38' },
        '--dsw-alias-link': { light: '#755382', dark: '#dfb6df' },
        '--dsw-alias-markdown-citation': { light: '#eee3ef', dark: '#3a3040' },
        '--dsw-alias-markdown-inline-code': { light: '#f1eaf2', dark: '#342d39' },
        '--dsw-alias-markdown-placeholder': { light: '#efe7f1', dark: '#312a35' },
        '--dsw-alias-markdown-tag': { light: '#eee5f0', dark: '#322a37' },
        '--dsw-alias-toast-bg': { light: '#453b4c', dark: '#3d3543' },
        '--dsw-alias-tooltip-bg': { light: '#453b4c', dark: '#3d3543' },
        '--shiki-token-constant': { light: '#875587', dark: '#dba9d7' },
        '--shiki-token-link': { light: '#9c6a99', dark: '#ecc4e7' },
      },
      cinna: {
        '--dsw-alias-brand-primary': { light: '#34789f', dark: '#9bcde5' },
        '--dsw-alias-brand-text': { light: '#fafdff', dark: '#1e313b' },
        '--dsw-alias-bg-base': { light: '#f8fbfc', dark: '#1c2025' },
        '--dsw-alias-bg-layer-1': { light: '#fffefd', dark: '#252c33' },
        '--dsw-alias-bg-layer-2': { light: '#f1f7f9', dark: '#2d363e' },
        '--dsw-alias-bg-layer-3': { light: '#e6f0f4', dark: '#36414a' },
        '--dsw-alias-bg-overlay': { light: '#fbfdfe', dark: '#3b4852' },
        '--dsw-alias-label-primary': { light: '#344853', dark: '#eaf1f4' },
        '--dsw-alias-label-secondary': { light: '#6f8490', dark: '#bdcbd2' },
        '--dsw-alias-label-tertiary': { light: '#98aab3', dark: '#94a8b2' },
        '--dsw-alias-border-l1': { light: '#dce9ed', dark: '#3c4850' },
        '--dsw-alias-border-l2': { light: '#c9dbe2', dark: '#52606b' },
        '--dsw-alias-interactive-bg-hover': { light: '#e8f3f7', dark: '#303b43' },
        '--dsw-alias-interactive-bg-active': { light: '#d7e9f0', dark: '#3a4e5a' },
        '--dsw-alias-interactive-bg-hover-solid': { light: '#e0eef3', dark: '#35434c' },
        '--dsw-alias-button-primary-fill': { light: '#34789f', dark: '#9bcde5' },
        '--dsw-alias-button-primary-hover': { light: '#27698f', dark: '#b4ddef' },
        '--dsw-alias-state-error-primary': { light: '#bf6872', dark: '#e9949c' },
        '--dsw-alias-state-warn-primary': { light: '#aa8752', dark: '#d8b77e' },
        '--dsw-alias-state-success-primary': { light: '#5b9889', dark: '#87c4b1' },
        '--dsw-specific-sidebar-fill': { light: '#eaf3f6', dark: '#242b32' },
        '--dsw-alias-scrollbar-bg-l1': { light: '#abcad6', dark: '#526875' },
        '--dsw-alias-scrollbar-hover-l1': { light: '#8fb6c7', dark: '#6e8796' },
        '--dsw-alias-brand-primary-new-colorprimary-new-color': { light: '#34789f', dark: '#9bcde5' },
        '--dsw-alias-state-business-primary': { light: '#34789f', dark: '#9bcde5' },
        '--dsw-alias-state-business-tertiary': { light: '#e4f1f6', dark: '#2e4653' },
        '--dsw-alias-button-info-fill': { light: '#34789f', dark: '#9bcde5' },
        '--dsw-alias-button-info-hover': { light: '#27698f', dark: '#b4ddef' },
        '--dsw-alias-interactive-bg-hover-accent': { light: '#deedf2', dark: '#354b57' },
        '--dsw-specific-bubble': { light: '#eff6f8', dark: '#29333b' },
        '--dsw-specific-bubble-highlight': { light: '#ddebf1', dark: '#354853' },
        '--dsw-specific-sidebar-nav-item-active-accent': { light: '#d9eaf1', dark: '#354a56' },
        '--dsw-specific-sidebar-nav-item-active': { light: '#e4f0f4', dark: '#2e3d46' },
        '--dsw-specific-sidebar-nav-item-hover': { light: '#e6f1f5', dark: '#2b363e' },
        '--dsw-specific-tip': { light: '#e8f2f5', dark: '#2e3941' },
        '--dsw-alias-link': { light: '#2f7199', dark: '#add9ef' },
        '--dsw-alias-markdown-citation': { light: '#e5f1f5', dark: '#31414b' },
        '--dsw-alias-markdown-inline-code': { light: '#edf4f6', dark: '#303a42' },
        '--dsw-alias-markdown-placeholder': { light: '#ebf3f6', dark: '#2d3941' },
        '--dsw-alias-markdown-tag': { light: '#e7f1f4', dark: '#2b363f' },
        '--dsw-alias-toast-bg': { light: '#304a59', dark: '#344650' },
        '--dsw-alias-tooltip-bg': { light: '#304a59', dark: '#344650' },
        '--shiki-token-constant': { light: '#34789f', dark: '#a4d4e9' },
        '--shiki-token-link': { light: '#2f7199', dark: '#b4ddef' },
      },
    }
    const copy = {
      zh: {
        title: '选择皮肤',
        hint: '选中即切换并保存。浅色、深色和跟随系统继续使用 DSH 的外观设置。',
        failed: '保存失败，请重新选择。',
        unavailable: '插件设置暂时不可用。',
        pudding: '布丁狗', kitty: 'Hello Kitty', kuromi: '酷洛米', cinna: '玉桂狗',
        petDrag: '拖动吉祥物，或使用方向键移动',
        petNeedsInput: '等你回答一下～',
        petCompleted: '这轮已完成～',
        petBlocked: '这轮没能继续，去会话看看',
      },
      en: {
        title: 'Choose a skin',
        hint: 'Selecting a character switches and saves right away. DSH Appearance still controls light, dark, and system modes.',
        failed: 'Could not save. Please choose again.',
        unavailable: 'Plugin settings are unavailable.',
        pudding: 'Pompompurin', kitty: 'Hello Kitty', kuromi: 'Kuromi', cinna: 'Cinnamoroll',
        petDrag: 'Drag the mascot, or use arrow keys to move it',
        petNeedsInput: 'Waiting for your answer',
        petCompleted: 'This turn is complete',
        petBlocked: 'This turn could not continue; check the conversation',
      },
    }

    function readPetPosition() {
      try {
        const value = JSON.parse(window.localStorage.getItem(PET_POSITION_KEY))
        if (Number.isFinite(value?.x) && Number.isFinite(value?.y)
          && value.x >= 0 && value.x <= 1 && value.y >= 0 && value.y <= 1) return value
      } catch { /* Storage is optional for this window-only preference. */ }
      return null
    }

    function savePetPosition(value) {
      try { window.localStorage.setItem(PET_POSITION_KEY, JSON.stringify(value)) } catch { /* Keep dragging without persistence. */ }
    }

    function clamp(value, min, max) { return Math.min(Math.max(value, min), max) }

    function petLimits(bounds) {
      const minX = Math.min(8, Math.max(0, bounds.width - bounds.petWidth))
      const maxX = Math.max(minX, bounds.width - bounds.petWidth - 8)
      const minY = Math.min(56, Math.max(0, bounds.height - bounds.petHeight))
      const maxY = Math.max(minY, bounds.height - bounds.petHeight - 8)
      return { minX, maxX, minY, maxY }
    }

    function petCoordinates(bounds, saved) {
      const { minX, maxX, minY, maxY } = petLimits(bounds)
      return saved
        ? { x: minX + saved.x * (maxX - minX), y: minY + saved.y * (maxY - minY) }
        : { x: clamp(32, minX, maxX), y: clamp(bounds.height - bounds.petHeight - 56, minY, maxY) }
    }

    function petPositionFromPixels(bounds, x, y) {
      const { minX, maxX, minY, maxY } = petLimits(bounds)
      return {
        x: (clamp(x, minX, maxX) - minX) / (maxX - minX || 1),
        y: (clamp(y, minY, maxY) - minY) / (maxY - minY || 1),
      }
    }

    function lastDurableSeq(entries) {
      let last = 0
      for (const entry of entries) {
        if (entry.type === 'event' && entry.event.seq > last) last = entry.event.seq
      }
      return last
    }

    function selectedCharacter(form) {
      const id = form.getSnapshot().value?.character
      return Object.hasOwn(palettes, id) ? id : 'pudding'
    }

    function apply(ctx) {
      const form = ctx.configForms.get(PACKAGE)
      const subscribe = listener => form.subscribe(listener)
      const getSnapshot = () => form.getSnapshot()
      ctx.effect(() => ctx.locale.register('sanrioSkin', copy), 'dsh-sanrio-skin: locale')

      ctx.effect(() => {
        let current = selectedCharacter(form)
        let removeOverride = ctx.theme.overrideTokens(PACKAGE, palettes[current])
        const unsubscribe = form.subscribe(() => {
          const next = selectedCharacter(form)
          if (next === current) return
          current = next
          removeOverride = ctx.theme.overrideTokens(PACKAGE, palettes[next])
        })
        return () => { unsubscribe(); removeOverride() }
      }, 'dsh-sanrio-skin: colors')

      // A selected Session already owns its binding. Watch only new durable
      // turn/end events, so opening history or reconnecting never replays a bubble.
      function observeTurnEnds(sessionId, onEnd) {
        let source
        let unsubscribeEvents = () => {}
        let lastSeq = 0
        const attach = () => {
          const next = ctx.sessions.binding(sessionId)?.eventSource
          if (next === source) return
          unsubscribeEvents()
          source = next
          if (!source) return
          lastSeq = lastDurableSeq(source.getSnapshot().entries)
          unsubscribeEvents = source.subscribe(() => {
            const change = source.getSnapshot().change
            if (change.kind === 'replace') {
              lastSeq = lastDurableSeq(change.entries)
              return
            }
            if (change.kind !== 'append') return
            for (const entry of change.entries) {
              if (entry.type !== 'event' || entry.event.seq <= lastSeq) continue
              lastSeq = entry.event.seq
              if (entry.event.type === 'turn/end') onEnd(entry.event)
            }
          })
        }
        const unsubscribeList = ctx.sessions.list.subscribe(attach)
        attach()
        return () => { unsubscribeList(); unsubscribeEvents() }
      }

      function Mascot({ useSessions, useSessionStatus, usePanelInfo, observeTurnEnds, t }) {
        const snapshot = React.useSyncExternalStore(subscribe, getSnapshot)
        const character = characters.find(item => item.id === snapshot.value?.character) ?? characters[0]
        const sessionId = useSessions(state => Object.values(state.byId)
          .find(row => (row.retainedBy.mainView ?? 0) > 0)?.id)
        const needsInput = useSessionStatus(status => status.get(sessionId)?.pendingInteraction !== undefined)
        const running = useSessionStatus(status => status.get(sessionId)?.running)
        const activePanelId = usePanelInfo(info => info.activePanelId)
        const frameRef = React.useRef(null)
        const petRef = React.useRef(null)
        const dragRef = React.useRef(null)
        const currentRef = React.useRef(null)
        const [saved, setSaved] = React.useState(readPetPosition)
        const [dragging, setDragging] = React.useState(false)
        const [notice, setNotice] = React.useState(null)
        const [bounds, setBounds] = React.useState(() => ({
          width: window.innerWidth, height: window.innerHeight, petWidth: 120, petHeight: 120,
        }))
        const position = petCoordinates(bounds, saved)
        currentRef.current = { sessionId, needsInput, activePanelId }

        const measure = () => {
          if (!frameRef.current || !petRef.current) return
          const frame = frameRef.current.getBoundingClientRect()
          const pet = petRef.current.getBoundingClientRect()
          setBounds(previous => {
            const next = { width: frame.width, height: frame.height, petWidth: pet.width, petHeight: pet.height }
            return Object.keys(next).every(key => next[key] === previous[key]) ? previous : next
          })
        }
        React.useLayoutEffect(() => {
          measure()
          const observer = new ResizeObserver(measure)
          observer.observe(frameRef.current)
          observer.observe(petRef.current)
          return () => observer.disconnect()
        }, [])

        React.useEffect(() => {
          setNotice(null)
          if (!sessionId) return
          return observeTurnEnds(sessionId, event => {
            if (currentRef.current.sessionId !== sessionId
              || currentRef.current.activePanelId !== null
              || currentRef.current.needsInput) return
            const reason = event.data.reason.kind
            const kind = reason === 'completed' ? 'completed'
              : ['blocked', 'error', 'max-tokens'].includes(reason) ? 'blocked' : null
            if (kind) setNotice({ sessionId, seq: event.seq, kind })
          })
        }, [sessionId, observeTurnEnds])

        React.useEffect(() => { if (running || needsInput || activePanelId !== null) setNotice(null) },
          [running, needsInput, activePanelId])
        React.useEffect(() => {
          if (!notice) return
          const timer = window.setTimeout(() => setNotice(current => current === notice ? null : current),
            notice.kind === 'completed' ? 5000 : 9000)
          return () => window.clearTimeout(timer)
        }, [notice])

        const stopDrag = event => {
          const drag = dragRef.current
          if (!drag || (event.pointerId !== undefined && drag.pointerId !== event.pointerId)) return
          dragRef.current = null
          setDragging(false)
          if (drag.last) savePetPosition(drag.last)
          if (event.currentTarget.hasPointerCapture?.(drag.pointerId))
            event.currentTarget.releasePointerCapture(drag.pointerId)
        }
        const onPointerDown = event => {
          if (event.button !== 0 || dragRef.current) return
          event.preventDefault()
          event.currentTarget.setPointerCapture(event.pointerId)
          dragRef.current = {
            pointerId: event.pointerId, x: event.clientX, y: event.clientY,
            origin: position, last: null,
          }
          setDragging(true)
        }
        const onPointerMove = event => {
          const drag = dragRef.current
          if (!drag || drag.pointerId !== event.pointerId) return
          const next = petPositionFromPixels(bounds,
            drag.origin.x + event.clientX - drag.x, drag.origin.y + event.clientY - drag.y)
          drag.last = next
          setSaved(next)
        }
        const onKeyDown = event => {
          const delta = event.shiftKey ? 40 : 16
          const dx = event.key === 'ArrowLeft' ? -delta : event.key === 'ArrowRight' ? delta : 0
          const dy = event.key === 'ArrowUp' ? -delta : event.key === 'ArrowDown' ? delta : 0
          if (!dx && !dy) return
          event.preventDefault()
          const next = petPositionFromPixels(bounds, position.x + dx, position.y + dy)
          setSaved(next)
          savePetPosition(next)
        }

        const kind = activePanelId === null && sessionId
          ? needsInput ? 'needsInput' : notice?.sessionId === sessionId ? notice.kind : null
          : null
        const bubbleBelow = position.y < 110
        const bubbleWidth = Math.min(200, Math.max(80, bounds.width - 16))
        const bubbleX = clamp(position.x, 8, Math.max(8, bounds.width - bubbleWidth - 8))
        const tailX = clamp(position.x + bounds.petWidth / 2 - bubbleX - 5, 15, bubbleWidth - 15)
        const label = kind === 'needsInput' ? t('petNeedsInput')
          : kind === 'completed' ? t('petCompleted') : t('petBlocked')
        const bubble = kind && React.createElement('div', {
          role: kind === 'blocked' ? 'alert' : 'status',
          style: {
            position: 'absolute',
            [bubbleBelow ? 'top' : 'bottom']: 'calc(100% + 10px)',
            left: bubbleX - position.x,
            width: bubbleWidth,
            boxSizing: 'border-box',
            padding: '8px 11px',
            borderRadius: 12,
            border: '1px solid var(--dsw-alias-border-l2)',
            background: 'var(--dsw-alias-bg-overlay)',
            color: 'var(--dsw-alias-label-primary)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.14)',
            fontSize: 13,
            lineHeight: 1.4,
            pointerEvents: 'none',
            whiteSpace: 'normal',
          },
        }, label, React.createElement('span', {
          'aria-hidden': true,
          style: {
            position: 'absolute',
            [bubbleBelow ? 'top' : 'bottom']: -6,
            left: tailX,
            width: 10, height: 10,
            transform: 'rotate(45deg)',
            background: 'var(--dsw-alias-bg-overlay)',
            border: '1px solid var(--dsw-alias-border-l2)',
            borderTop: bubbleBelow ? undefined : 0,
            borderLeft: bubbleBelow ? undefined : 0,
            borderBottom: bubbleBelow ? 0 : undefined,
            borderRight: bubbleBelow ? 0 : undefined,
          },
        }))

        return React.createElement('div', {
          ref: frameRef,
          style: { position: 'absolute', inset: 0, pointerEvents: 'none' },
        }, React.createElement('div', {
          ref: petRef,
          role: 'group',
          tabIndex: 0,
          'aria-label': t('petDrag'),
          title: t('petDrag'),
          onPointerDown, onPointerMove,
          onPointerUp: stopDrag, onPointerCancel: stopDrag,
          onLostPointerCapture: stopDrag, onKeyDown,
          style: {
            position: 'absolute', left: position.x, top: position.y,
            width: 'min(120px, 15vw)', pointerEvents: 'auto',
            userSelect: 'none', touchAction: 'none',
            cursor: dragging ? 'grabbing' : 'grab',
            WebkitAppRegion: 'no-drag',
          },
        }, bubble, React.createElement('img', {
          src: ASSET_ROOT + character.image, alt: '', 'aria-hidden': true, draggable: false,
          onLoad: measure,
          style: { display: 'block', width: '100%', height: 'auto', pointerEvents: 'none' },
        })))
      }

      function BrandMark({ size, className }) {
        const snapshot = React.useSyncExternalStore(subscribe, getSnapshot)
        const character = characters.find(item => item.id === snapshot.value?.character) ?? characters[0]
        return React.createElement('img', {
          src: ASSET_ROOT + character.brand, alt: '', 'aria-hidden': true, draggable: false, className,
          style: { display: 'block', width: size, height: size, objectFit: 'contain' },
        })
      }

      function PeekOverlay() {
        const snapshot = React.useSyncExternalStore(subscribe, getSnapshot)
        const character = characters.find(item => item.id === snapshot.value?.character) ?? characters[0]
        return React.createElement('div', {
          'aria-hidden': true,
          style: {
            position: 'relative', width: '100%', height: 0,
            pointerEvents: 'none', userSelect: 'none',
          },
        }, React.createElement('img', {
          src: ASSET_ROOT + character.peek, alt: '', draggable: false,
          style: {
            position: 'absolute', right: 0, bottom: 0,
            width: 'min(220px, 35vw)', height: 148,
            objectFit: 'contain', objectPosition: 'right bottom', opacity: 0.3,
          },
        }))
      }

      function FriendsStrip() {
        const snapshot = React.useSyncExternalStore(subscribe, getSnapshot)
        const character = characters.find(item => item.id === snapshot.value?.character) ?? characters[0]
        const strip = React.useRef(null)
        const [position, setPosition] = React.useState(null)

        React.useLayoutEffect(() => {
          const node = strip.current
          const header = node?.closest('header')
          const anchor = node?.offsetParent
          if (!node || !header || !anchor) return

          const update = () => {
            const headerBox = header.getBoundingClientRect()
            const anchorBox = anchor.getBoundingClientRect()
            const next = {
              top: headerBox.bottom - anchorBox.top,
              left: headerBox.left - anchorBox.left,
              width: headerBox.width,
            }
            setPosition(previous => previous &&
              previous.top === next.top && previous.left === next.left && previous.width === next.width
              ? previous : next)
          }
          const observer = new ResizeObserver(update)
          observer.observe(header)
          observer.observe(anchor)
          window.addEventListener('resize', update)
          update()
          return () => {
            observer.disconnect()
            window.removeEventListener('resize', update)
          }
        }, [])

        return React.createElement('div', {
          ref: strip,
          'aria-hidden': true,
          style: {
            position: 'absolute',
            top: position?.top ?? 0,
            left: position?.left ?? 0,
            width: position?.width ?? 0,
            height: 0,
            visibility: position ? 'visible' : 'hidden',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 2,
          },
        }, React.createElement('div', {
          style: {
            position: 'absolute', left: 'min(190px, 36%)', right: '4%', bottom: 0,
            display: 'flex', alignItems: 'end', justifyContent: 'space-between',
            gap: 2, height: 34, overflow: 'hidden',
          },
        }, character.friends.map(file => React.createElement('img', {
          key: file, src: ASSET_ROOT + file, alt: '', draggable: false,
          style: { display: 'block', flex: '1 1 0', minWidth: 0, maxWidth: 40,
            height: 34, objectFit: 'contain', objectPosition: 'center bottom' },
        }))))
      }

      function SkinConfig({ t }) {
        const snapshot = React.useSyncExternalStore(subscribe, getSnapshot)
        const character = selectedCharacter(form)
        const [pending, setPending] = React.useState(null)
        const [message, setMessage] = React.useState('')
        const ready = snapshot.status === 'ready' && snapshot.writable
        const selected = pending ?? character
        React.useEffect(() => {
          if (pending !== null && pending === character) setPending(null)
        }, [character, pending])
        const choose = async id => {
          if (!ready || id === selected) return
          setPending(id)
          setMessage('')
          let accepted = false
          try {
            accepted = await form.set('character', id)
          } catch {
            accepted = false
          }
          if (!accepted) {
            setPending(current => (current === id ? null : current))
            setMessage('failed')
          }
        }
        return React.createElement('div', { style: { display: 'grid', gap: 14 } },
          React.createElement('div', null,
            React.createElement('h4', { style: { margin: '0 0 6px' } }, t('title')),
            React.createElement('p', { style: { margin: 0, color: 'var(--dsw-alias-label-secondary)' } }, t('hint')),
          ),
          React.createElement('fieldset', {
            disabled: !ready,
            style: { border: 0, padding: 0, margin: 0, display: 'grid', gap: 8 },
          }, characters.map(item => React.createElement('label', {
            key: item.id,
            style: {
              display: 'flex', alignItems: 'center', gap: 12, cursor: ready ? 'pointer' : 'default',
              padding: '8px 12px', borderRadius: 12,
              border: `1px solid var(${selected === item.id ? '--dsw-alias-brand-primary' : '--dsw-alias-border-l1'})`,
              background: 'var(--dsw-alias-bg-layer-1)',
            },
          },
          React.createElement('input', { type: 'radio', name: 'sanrio-character', value: item.id,
            checked: selected === item.id,
            onChange: () => { void choose(item.id) } }),
          React.createElement('img', { src: ASSET_ROOT + item.image, alt: '', 'aria-hidden': true,
            style: { width: 42, height: 42, objectFit: 'contain' } }),
          React.createElement('span', null, t(item.id)),
          ))),
          React.createElement('span', { role: message === 'failed' ? 'alert' : 'status' },
            message ? t(message) : !ready ? t('unavailable') : ''),
        )
      }

      ctx.slots.inject('shell.overlay', () => ctx.slots.register({
        name: 'shell.overlay', id: 'sanrio-mascot', locale: 'sanrioSkin',
        inject: () => ({ observeTurnEnds }),
      }, Mascot))
      ctx.slots.inject('sidebar.brand.mark', () => ctx.slots.register({
        name: 'sidebar.brand.mark', priority: -10,
      }, BrandMark))
      ctx.slots.inject('conversation.hero.brand.mark', () => ctx.slots.register({
        name: 'conversation.hero.brand.mark', priority: -10,
      }, BrandMark))
      ctx.slots.inject('conversation.input.overlay', () => ctx.slots.register({
        name: 'conversation.input.overlay', id: 'sanrio-peek', order: -100,
      }, PeekOverlay))
      ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register({
        name: 'conversation.session.header.actions', id: 'sanrio-friends-strip', order: 100,
      }, FriendsStrip))
      ctx.slots.inject('plugins.bundle.config', () => ctx.slots.register({
        name: 'plugins.bundle.config', key: PACKAGE, locale: 'sanrioSkin',
      }, SkinConfig))
    }

    return { inject: ['theme', 'slots', 'configForms', 'locale', 'sessions'], apply }
  },
})
