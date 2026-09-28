window.__ModuleLoader__.load({
  id: 'dsh-sanrio-skin',
  factory(require) {
    const React = require('react')
    const PACKAGE = 'dsh-sanrio-skin'
    const ASSET_ROOT = '/sanrio-skin-assets/'
    const characters = [
      { id: 'pudding', image: 'mascot.gif', brand: 'brandlogo.png', peek: 'peek.png' },
      { id: 'kitty', image: 'kitty-mascot.gif', brand: 'kitty-brandlogo.png', peek: 'kitty-peek.png' },
      { id: 'kuromi', image: 'kuromi-mascot.gif', brand: 'kuromi-brandlogo.png', peek: 'kuromi-peek.png' },
      { id: 'cinna', image: 'cinna-mascot.png', brand: 'cinna-brandlogo.png', peek: 'cinna-peek.png' },
    ]
    // Pompompurin is tuned around the mascot's custard yellow and reddish-brown hat.
    // Every character covers the same DSH token set in both light and dark modes.
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
        '--dsw-alias-brand-primary': { light: '#e63950', dark: '#ff6b81' },
        '--dsw-alias-brand-text': { light: '#fff6f7', dark: '#241318' },
        '--dsw-alias-bg-base': { light: '#fff6f5', dark: '#1d1416' },
        '--dsw-alias-bg-layer-1': { light: '#fffdfc', dark: '#251a1c' },
        '--dsw-alias-bg-layer-2': { light: '#fff1f2', dark: '#2c2023' },
        '--dsw-alias-bg-layer-3': { light: '#ffeced', dark: '#332427' },
        '--dsw-alias-bg-overlay': { light: '#fff8f8', dark: '#3a2a2d' },
        '--dsw-alias-label-primary': { light: '#3a3032', dark: '#f6eef0' },
        '--dsw-alias-label-secondary': { light: '#8a7c7f', dark: '#bca9ad' },
        '--dsw-alias-label-tertiary': { light: '#b09ba0', dark: '#8f777c' },
        '--dsw-alias-border-l1': { light: '#f3d8db', dark: '#3a2a2d' },
        '--dsw-alias-border-l2': { light: '#ecc9cd', dark: '#4a3438' },
        '--dsw-alias-interactive-bg-hover': { light: '#fde8ea', dark: '#2f1d20' },
        '--dsw-alias-interactive-bg-active': { light: '#f9d2d6', dark: '#3f272b' },
        '--dsw-alias-interactive-bg-hover-solid': { light: '#fbdadd', dark: '#3a2226' },
        '--dsw-alias-button-primary-fill': { light: '#e63950', dark: '#ff6b81' },
        '--dsw-alias-button-primary-hover': { light: '#d11f38', dark: '#ff8f9e' },
        '--dsw-alias-state-error-primary': { light: '#e63950', dark: '#ff8f9e' },
        '--dsw-alias-state-warn-primary': { light: '#f2a54c', dark: '#f6b45a' },
        '--dsw-alias-state-success-primary': { light: '#57b56b', dark: '#6fcf7f' },
        '--dsw-specific-sidebar-fill': { light: '#fdeff0', dark: '#24181a' },
        '--dsw-alias-scrollbar-bg-l1': { light: '#e8b3bc', dark: '#6b3a42' },
        '--dsw-alias-scrollbar-hover-l1': { light: '#d98a97', dark: '#8a4b55' },
        '--dsw-alias-brand-primary-new-colorprimary-new-color': { light: '#e63950', dark: '#ff6b81' },
        '--dsw-alias-state-business-primary': { light: '#e63950', dark: '#ff6b81' },
        '--dsw-alias-state-business-tertiary': { light: '#fde7ea', dark: '#4a2a30' },
        '--dsw-alias-button-info-fill': { light: '#e63950', dark: '#ff8f9e' },
        '--dsw-alias-button-info-hover': { light: '#d11f38', dark: '#ffb3bd' },
        '--dsw-alias-interactive-bg-hover-accent': { light: '#fce4e8', dark: '#3a2226' },
        '--dsw-specific-bubble': { light: '#fdecf0', dark: '#2f1c20' },
        '--dsw-specific-bubble-highlight': { light: '#f9d9df', dark: '#4a2a30' },
        '--dsw-specific-sidebar-nav-item-active-accent': { light: '#fbdde3', dark: '#41242a' },
        '--dsw-specific-sidebar-nav-item-active': { light: '#fce9ed', dark: '#3a2226' },
        '--dsw-specific-sidebar-nav-item-hover': { light: '#f9e3e7', dark: '#332024' },
        '--dsw-specific-tip': { light: '#f9e8ec', dark: '#362226' },
        '--dsw-alias-link': { light: '#c52e42', dark: '#ff8f9e' },
        '--dsw-alias-markdown-citation': { light: '#fbe4e8', dark: '#3b2428' },
        '--dsw-alias-markdown-inline-code': { light: '#fbeaee', dark: '#382226' },
        '--dsw-alias-markdown-placeholder': { light: '#fae6ea', dark: '#362226' },
        '--dsw-alias-markdown-tag': { light: '#f9e3e7', dark: '#331f23' },
        '--dsw-alias-toast-bg': { light: '#5a2028', dark: '#4a2a30' },
        '--dsw-alias-tooltip-bg': { light: '#5a2028', dark: '#4a2a30' },
        '--shiki-token-constant': { light: '#c0392b', dark: '#ff8f9e' },
        '--shiki-token-link': { light: '#c0564a', dark: '#ffb3bd' },
      },
      kuromi: {
        '--dsw-alias-brand-primary': { light: '#c2447f', dark: '#e96fb1' },
        '--dsw-alias-brand-text': { light: '#fff3f9', dark: '#1c1220' },
        '--dsw-alias-bg-base': { light: '#f7f4f8', dark: '#14111a' },
        '--dsw-alias-bg-layer-1': { light: '#ffffff', dark: '#1c1823' },
        '--dsw-alias-bg-layer-2': { light: '#f4eef6', dark: '#221d2b' },
        '--dsw-alias-bg-layer-3': { light: '#efe6f2', dark: '#2a2337' },
        '--dsw-alias-bg-overlay': { light: '#fbf8fc', dark: '#302842' },
        '--dsw-alias-label-primary': { light: '#2f2836', dark: '#f3eef7' },
        '--dsw-alias-label-secondary': { light: '#7e7286', dark: '#b8aec6' },
        '--dsw-alias-label-tertiary': { light: '#a295ad', dark: '#8f83a3' },
        '--dsw-alias-border-l1': { light: '#e6dfec', dark: '#342d40' },
        '--dsw-alias-border-l2': { light: '#d9ccdf', dark: '#463b55' },
        '--dsw-alias-interactive-bg-hover': { light: '#fbe6f1', dark: '#2a1f31' },
        '--dsw-alias-interactive-bg-active': { light: '#f4d3e5', dark: '#3a2a47' },
        '--dsw-alias-interactive-bg-hover-solid': { light: '#f7dceb', dark: '#362740' },
        '--dsw-alias-button-primary-fill': { light: '#c2447f', dark: '#e96fb1' },
        '--dsw-alias-button-primary-hover': { light: '#a63669', dark: '#f08cc4' },
        '--dsw-alias-state-error-primary': { light: '#c54e6d', dark: '#ee8499' },
        '--dsw-alias-state-warn-primary': { light: '#b38a45', dark: '#ddb878' },
        '--dsw-alias-state-success-primary': { light: '#58a781', dark: '#80c9a0' },
        '--dsw-specific-sidebar-fill': { light: '#f2edf6', dark: '#1b1722' },
        '--dsw-alias-scrollbar-bg-l1': { light: '#d78cc0', dark: '#7a4a67' },
        '--dsw-alias-scrollbar-hover-l1': { light: '#c063a6', dark: '#9a5c84' },
        '--dsw-alias-brand-primary-new-colorprimary-new-color': { light: '#c2447f', dark: '#e96fb1' },
        '--dsw-alias-state-business-primary': { light: '#c2447f', dark: '#e96fb1' },
        '--dsw-alias-state-business-tertiary': { light: '#f7e5f0', dark: '#3a2233' },
        '--dsw-alias-button-info-fill': { light: '#c2447f', dark: '#e96fb1' },
        '--dsw-alias-button-info-hover': { light: '#a63669', dark: '#f08cc4' },
        '--dsw-alias-interactive-bg-hover-accent': { light: '#f6e0ee', dark: '#3a2440' },
        '--dsw-specific-bubble': { light: '#f9e7f2', dark: '#2a1c28' },
        '--dsw-specific-bubble-highlight': { light: '#efd0e5', dark: '#3f2a3a' },
        '--dsw-specific-sidebar-nav-item-active-accent': { light: '#f4d9ea', dark: '#372233' },
        '--dsw-specific-sidebar-nav-item-active': { light: '#f8e5f1', dark: '#2c1e2a' },
        '--dsw-specific-sidebar-nav-item-hover': { light: '#f6e0ee', dark: '#271c24' },
        '--dsw-specific-tip': { light: '#f5e3ee', dark: '#2a1e28' },
        '--dsw-alias-link': { light: '#aa3674', dark: '#f08cc4' },
        '--dsw-alias-markdown-citation': { light: '#f5dcea', dark: '#33232f' },
        '--dsw-alias-markdown-inline-code': { light: '#f7e4ef', dark: '#30222c' },
        '--dsw-alias-markdown-placeholder': { light: '#f6e0ed', dark: '#2f222a' },
        '--dsw-alias-markdown-tag': { light: '#f5e3ee', dark: '#2c1f27' },
        '--dsw-alias-toast-bg': { light: '#4a2440', dark: '#3a2233' },
        '--dsw-alias-tooltip-bg': { light: '#4a2440', dark: '#3a2233' },
        '--shiki-token-constant': { light: '#b8306f', dark: '#ff8cc4' },
        '--shiki-token-link': { light: '#a93a66', dark: '#ffb0d8' },
      },
      cinna: {
        '--dsw-alias-brand-primary': { light: '#7fc2e6', dark: '#8fd0f0' },
        '--dsw-alias-brand-text': { light: '#10222e', dark: '#10222e' },
        '--dsw-alias-bg-base': { light: '#fbf7f1', dark: '#1a2128' },
        '--dsw-alias-bg-layer-1': { light: '#ffffff', dark: '#222b33' },
        '--dsw-alias-bg-layer-2': { light: '#f3f9fc', dark: '#29343d' },
        '--dsw-alias-bg-layer-3': { light: '#ecf5fa', dark: '#303d47' },
        '--dsw-alias-bg-overlay': { light: '#f8fcfd', dark: '#374653' },
        '--dsw-alias-label-primary': { light: '#4a5665', dark: '#e6eef5' },
        '--dsw-alias-label-secondary': { light: '#8ea1b3', dark: '#93a7b8' },
        '--dsw-alias-label-tertiary': { light: '#adbdca', dark: '#6f8293' },
        '--dsw-alias-border-l1': { light: '#e6eef4', dark: '#2c3842' },
        '--dsw-alias-border-l2': { light: '#d5e2ec', dark: '#3a4a56' },
        '--dsw-alias-interactive-bg-hover': { light: '#e9f4fb', dark: '#26333c' },
        '--dsw-alias-interactive-bg-active': { light: '#d6ebf7', dark: '#2f404b' },
        '--dsw-alias-interactive-bg-hover-solid': { light: '#e3f1f9', dark: '#2b3a45' },
        '--dsw-alias-button-primary-fill': { light: '#7fc2e6', dark: '#8fd0f0' },
        '--dsw-alias-button-primary-hover': { light: '#5fb0dd', dark: '#a6ddf7' },
        '--dsw-alias-state-error-primary': { light: '#ca6b70', dark: '#e4929a' },
        '--dsw-alias-state-warn-primary': { light: '#bc914f', dark: '#dbb976' },
        '--dsw-alias-state-success-primary': { light: '#58a895', dark: '#80cbb1' },
        '--dsw-specific-sidebar-fill': { light: '#f3f8fb', dark: '#202931' },
        '--dsw-alias-scrollbar-bg-l1': { light: '#b5d9ed', dark: '#3d5b6e' },
        '--dsw-alias-scrollbar-hover-l1': { light: '#8fc1e0', dark: '#517b93' },
        '--dsw-alias-brand-primary-new-colorprimary-new-color': { light: '#7fc2e6', dark: '#8fd0f0' },
        '--dsw-alias-state-business-primary': { light: '#7fc2e6', dark: '#8fd0f0' },
        '--dsw-alias-state-business-tertiary': { light: '#e6f4fb', dark: '#22343f' },
        '--dsw-alias-button-info-fill': { light: '#7fc2e6', dark: '#8fd0f0' },
        '--dsw-alias-button-info-hover': { light: '#5fb0dd', dark: '#a6ddf7' },
        '--dsw-alias-interactive-bg-hover-accent': { light: '#e3f2fa', dark: '#26343d' },
        '--dsw-specific-bubble': { light: '#eaf6fc', dark: '#1f2b33' },
        '--dsw-specific-bubble-highlight': { light: '#d3eaf7', dark: '#2c3f4b' },
        '--dsw-specific-sidebar-nav-item-active-accent': { light: '#dceff9', dark: '#263a45' },
        '--dsw-specific-sidebar-nav-item-active': { light: '#e8f4fb', dark: '#22323c' },
        '--dsw-specific-sidebar-nav-item-hover': { light: '#e6f3fa', dark: '#203038' },
        '--dsw-specific-tip': { light: '#e4f1f9', dark: '#21313a' },
        '--dsw-alias-link': { light: '#2f7ba8', dark: '#a6ddf7' },
        '--dsw-alias-markdown-citation': { light: '#def0f9', dark: '#243642' },
        '--dsw-alias-markdown-inline-code': { light: '#e6f4fb', dark: '#22333d' },
        '--dsw-alias-markdown-placeholder': { light: '#e2f1f9', dark: '#21323b' },
        '--dsw-alias-markdown-tag': { light: '#e4f2fa', dark: '#1f2e37' },
        '--dsw-alias-toast-bg': { light: '#24485c', dark: '#22343f' },
        '--dsw-alias-tooltip-bg': { light: '#24485c', dark: '#22343f' },
        '--shiki-token-constant': { light: '#3a8fc0', dark: '#8fd0f0' },
        '--shiki-token-link': { light: '#2f7ba8', dark: '#a6ddf7' },
      },
    }
    const copy = {
      zh: {
        title: '选择皮肤',
        hint: '选择角色后保存。浅色、深色和跟随系统继续使用 DSH 的外观设置。',
        save: '保存皮肤',
        saving: '保存中…',
        saved: '已保存',
        failed: '保存失败，请重试。',
        unavailable: '插件设置暂时不可用。',
        pudding: '布丁狗', kitty: 'Hello Kitty', kuromi: '酷洛米', cinna: '玉桂狗',
      },
      en: {
        title: 'Choose a skin',
        hint: 'Choose a character and save. DSH Appearance still controls light, dark, and system modes.',
        save: 'Save skin',
        saving: 'Saving…',
        saved: 'Saved',
        failed: 'Could not save. Please try again.',
        unavailable: 'Plugin settings are unavailable.',
        pudding: 'Pompompurin', kitty: 'Hello Kitty', kuromi: 'Kuromi', cinna: 'Cinnamoroll',
      },
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

      function Mascot() {
        const snapshot = React.useSyncExternalStore(subscribe, getSnapshot)
        const character = characters.find(item => item.id === snapshot.value?.character) ?? characters[0]
        return React.createElement('img', {
          src: ASSET_ROOT + character.image,
          alt: '',
          'aria-hidden': true,
          draggable: false,
          style: {
            position: 'absolute',
            left: '32px',
            bottom: '56px',
            width: 'min(120px, 15vw)',
            height: 'auto',
            pointerEvents: 'none',
            userSelect: 'none',
          },
        })
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

      function SkinConfig({ t }) {
        const snapshot = React.useSyncExternalStore(subscribe, getSnapshot)
        const character = selectedCharacter(form)
        const [draft, setDraft] = React.useState(character)
        const [saving, setSaving] = React.useState(false)
        const [message, setMessage] = React.useState('')
        React.useEffect(() => { setDraft(character) }, [character])
        const ready = snapshot.status === 'ready' && snapshot.writable
        const save = async event => {
          event.preventDefault()
          if (!ready || saving || draft === character) return
          setSaving(true)
          setMessage('')
          try {
            setMessage(await form.set('character', draft) ? 'saved' : 'failed')
          } catch {
            setMessage('failed')
          } finally {
            setSaving(false)
          }
        }
        return React.createElement('form', { onSubmit: save, style: { display: 'grid', gap: 14 } },
          React.createElement('div', null,
            React.createElement('h4', { style: { margin: '0 0 6px' } }, t('title')),
            React.createElement('p', { style: { margin: 0, color: 'var(--dsw-alias-label-secondary)' } }, t('hint')),
          ),
          React.createElement('fieldset', {
            disabled: !ready || saving,
            style: { border: 0, padding: 0, margin: 0, display: 'grid', gap: 8 },
          }, characters.map(item => React.createElement('label', {
            key: item.id,
            style: {
              display: 'flex', alignItems: 'center', gap: 12, cursor: ready ? 'pointer' : 'default',
              padding: '8px 12px', borderRadius: 12,
              border: `1px solid var(${draft === item.id ? '--dsw-alias-brand-primary' : '--dsw-alias-border-l1'})`,
              background: 'var(--dsw-alias-bg-layer-1)',
            },
          },
          React.createElement('input', { type: 'radio', name: 'sanrio-character', value: item.id,
            checked: draft === item.id, onChange: () => { setDraft(item.id); setMessage('') } }),
          React.createElement('img', { src: ASSET_ROOT + item.image, alt: '', 'aria-hidden': true,
            style: { width: 42, height: 42, objectFit: 'contain' } }),
          React.createElement('span', null, t(item.id)),
          ))),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('button', { type: 'submit', disabled: !ready || saving || draft === character,
              style: { padding: '7px 14px', borderRadius: 8, border: 0, cursor: 'pointer',
                color: 'var(--dsw-alias-brand-text)', background: 'var(--dsw-alias-brand-primary)' } },
              t(saving ? 'saving' : 'save')),
            React.createElement('span', { role: message === 'failed' ? 'alert' : 'status' },
              message ? t(message) : !ready ? t('unavailable') : ''),
          ),
        )
      }

      ctx.slots.inject('shell.overlay', () => ctx.slots.register({
        name: 'shell.overlay', id: 'sanrio-mascot',
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
      ctx.slots.inject('plugins.bundle.config', () => ctx.slots.register({
        name: 'plugins.bundle.config', key: PACKAGE, locale: 'sanrioSkin',
      }, SkinConfig))
    }

    return { inject: ['theme', 'slots', 'configForms', 'locale'], apply }
  },
})
