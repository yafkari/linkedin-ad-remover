import React, { useState, useRef, useEffect } from 'react';
import './ToggleBtn.scss';

const activeImg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmUlEQVQ4T6WT0RWDMAhFeZs4ipu0mawZpaO4yevBc6hUIWLNd+4NeQDk5sE/PMkZwFvZywKSTxF5iUgH0C4JHGyF97IggFVSqyCFga0CvQSg70Mdwd8QSSr4sGBMcgavAgdvwQCtApvA2uKr1x7Pu++06ItrF5LXPB/CP4M0kKTwYRIDyRAOR9lJTuF0F0hOAJbKopVHOZN9ACS0UgowIx8ZAAAAAElFTkSuQmCC';
const inactiveImg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyklEQVQ4T42TaxHCQAyENw5wAhLACVUAUkABOCkSwEkdhNmbpHNckzv689L98toIAKjqGcAFwElEFr5ln6ruAMwA7iLyFBM/TPDuQSrxwf6fCKBoX2UMIYGYkg8BLOnVg2RiAEexGaQQq4w9e9klcxGLLAUwgDAcihlYAR1IvZA1sz/+AAaQjXhTQQVoe2Yo3E7UQiT2ijeQdojRtClOfVKvMVyVpU594kZK9zzySWTlcNqZY9tjCsUds00+A57z1e35xzlzJjee8xf0HYp+cOZQUQAAAABJRU5ErkJggg==';

interface ToggleBtnProps {
    id: string;
    classNames?: Array<string>;
    defaultChecked?: boolean;
    enabled?: boolean;
    showIcons?: boolean ;
    enabledColor?: string;
    disabledColor?: string;
    onClick: () => void;
}

export default function ToggleBtn({
  id,
  classNames = [],
  defaultChecked = false,
  enabled = false,
  showIcons = false,
  enabledColor = '#2ecc71',
  disabledColor = '#e74c3c',
  onClick,
}: ToggleBtnProps) {
  const [active, setActive] = useState(defaultChecked || enabled);
  const self = useRef<HTMLDivElement>(null);

  const onClickHandler = () => {
    setActive(!active);
    if (typeof onClick === 'function') onClick();
  };

  useEffect(() => {
    setActive(enabled);
  }, [enabled]);

  useEffect(() => {
    if (!self.current || !self.current.style) return;

    if (showIcons) {
      if (active) {
        self.current.style.background = `url(${activeImg}) no-repeat 10px center ${enabledColor}`;
      } else {
        self.current.style.background = `url(${inactiveImg}) no-repeat 50px center ${disabledColor}`;
      }
    } else if (active) {
      self.current.style.backgroundColor = enabledColor;
    } else {
      self.current.style.background = disabledColor;
    }
  }, [showIcons, active, self.current]);

  return (
    <div
      id={id}
      ref={self}
      className={`ToggleBtn ${active ? 'active' : ''}${
        Array.isArray(classNames) ? ` ${classNames.join(' ')}` : ''
      }`.trim()}
    >
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="value"
        onClick={onClickHandler}
      />
      <span className="round-btn" />
    </div>
  );
}
