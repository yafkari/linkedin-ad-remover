import ToggleBtn from 'components/ToggleBtn/ToggleBtn';
import { useEffect, useState } from 'react';
import { KEY } from '../constants'

export default function App() {
  const [active, setActive] = useState(true);

  /**
   * Helper function that gets and returns the current tab id
   * @returns
   */
  async function getCurrentTab(): Promise<number> {
    const queryOptions = { active: true, currentWindow: true };
    const tabs = await chrome.tabs.query(queryOptions);
    return tabs[0].id ?? -1;
  }

  /**
   * Runs the script that cares about removing the posts
   */
  const runScript = async (): Promise<void> => {
    const tabId = await getCurrentTab();

    if (tabId !== -1) {
      chrome.scripting.executeScript({
        target: { tabId },
        files: ['content_script.js']
      });
    }
  }

  /**
   * Removes the promoted posts everytime the active state is true
   */
  useEffect(() => {
    if (active) void runScript();
  }, [active])

  /**
   * Sets the new active state and store it in the storage.
   * If becomes inactive, page is also refreshed.
   *
   */
  const handleToggle = async () => {
    await chrome.storage.local.set({ [KEY]: !active });

    // if becomes inactive, refresh
    if (active) {
        const tabId = await getCurrentTab();
        chrome.tabs.reload(tabId);
    }

    setActive(!active);
  }

  /**
   * Gets the state stored in storage if exists.
   */
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
