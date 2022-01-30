import ToggleBtn from 'components/ToggleBtn/ToggleBtn';
import { useEffect, useState } from 'react';
import { KEY } from '../constants'

export default function App() {
  const [active, setActive] = useState(true);

  async function getCurrentTab(): Promise<number> {
    const queryOptions = { active: true, currentWindow: true };
    const tabs = await chrome.tabs.query(queryOptions);
    return tabs[0].id ?? -1;
  }

  const runScript = async (): Promise<void> => {
    const tabId = await getCurrentTab();

    if (tabId !== 1) {
      chrome.scripting.executeScript({
        target: { tabId },
        files: ['content_script.js']
      });
    }
  }

  useEffect(() => {
    if (active) void runScript();
  }, [active])

  const handleToggle = async () => {
    await chrome.storage.local.set({ [KEY]: !active });
    setActive(!active);
  }

  useEffect(() => {
    const getActive = async (): Promise<void> => {
      const isActive = await chrome.storage.local.get(KEY)
      if (Object.keys(isActive).length !== 0) setActive(isActive[KEY]);
    }

    void getActive();
  }, []);

  return (
    <div className="App">
      <h1>Linkedin Ad Remover</h1>
      <main>
        <ToggleBtn id="enable-ad-removal" enabled={active} onClick={handleToggle} />
      </main>
      <footer>
        <a href="https://github.com/yafkari/linkedin-ad-remover" target="_blank" rel="noopener noreferer noreferrer">
          Extension
        </a> made with ❤️ by <a href="https://www.linkedin.com/in/younes-afkari/" target="_blank" rel="noopener noreferer noreferrer">Younes Afkari</a>
      </footer>
    </div>
  )
}
