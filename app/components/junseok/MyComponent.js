// MyComponent.js
import styles from './MyStyles.module.css';

export function TopBar({ leftContent, rightContent }) {
  return (
    <div className={styles.TopBar}>
      <div className={styles.textWrapper}>{leftContent}</div>
      <div className={styles.fluentPerson}>{rightContent}</div>
    </div>
  );
}


export function Button1({ children }) {
    return (
      <button className={styles.Button1}>
        {children}
      </button>
    );
  }

  export function Button2() {
    return (
      <button className={styles.button2}>
        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="8" viewBox="0 0 2 8" fill="none">
          <path d="M1 1V7" stroke="#F0ECF1" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    );
  }

  export function TextField1() {
    return (
      <div className={styles.textField1}>
        <input type="text" placeholder="Enter text" className={styles.textInput} />
      </div>
    );
  }


// 다른 컴포넌트들도 추가 가능
