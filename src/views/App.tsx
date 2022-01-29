import ToggleBtn from 'components/ToggleBtn/ToggleBtn';
import { useEffect, useState } from 'react';
import { KEY } from '../constants'

export default function App() {
    const [active, setActive] = useState(true);

    async function getCurrentTab(): Promise<number> {
        let queryOptions = { active: true, currentWindow: true };
        let tabs = await chrome.tabs.query(queryOptions);
        return tabs[0].id ?? -1;
    }

    const handleToggle = async () => {
        await chrome.storage.local.set({[KEY]: !active});
        const tabId = await getCurrentTab();

        // If was not active, becomes active and starts removing all promoted posts
        if(!active && tabId !== -1) {
            chrome.scripting.executeScript({
                target: { tabId },
                files: ['content_script.js']
            })
        }

        setActive(!active)
    }

    useEffect(() => {
        const getActive = async (): Promise<void> => {
            const isActive = await chrome.storage.local.get(KEY)
            if (Object.keys(isActive).length !== 0) setActive(isActive[KEY]);
        }

        void getActive();
    }, [])

    return (
        <div className="App">
            <h1>Linkedin Ad Remover</h1>
            <main>
                <ToggleBtn id="enable-ad-removal" enabled={active} onClick={handleToggle} />
            </main>
            <footer>
                <a href="https://github.com/yafkari/linkedin-ad-remover" target="_blank" rel="noopener noreferer">
                    Extension
                </a> made with ❤️ by <a href="https://www.linkedin.com/in/younes-afkari/" target="_blank" rel="noopener noreferer">Younes Afkari</a>
            </footer>
        </div>
    )
}
