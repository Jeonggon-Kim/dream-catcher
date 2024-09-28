'use client';

import React, { useState } from 'react';
import styles from './MyStyles.module.css';
import Image from "next/image";

const iconMap = {
  fluentPerson: '/images/fluent_person-16-regular.svg',
};

 


export function TopBar({ leftContent, rightContent }) {
  return (
    <div className={styles.TopBar}>
      <div className={styles.textWrapper}>{leftContent}</div>
      <div className={styles.fluentPerson}>{rightContent}</div>
    </div>
  );
}

export function FluentPerson() {
  return (
    <Image src="/images/fluent_person-16-regular.svg" alt="My image" width={28} height={28} />
  );
}

export function Button1({ children }) {
  return <button className={styles.Button1}>{children}</button>;
}

export function Button2() {
  return (
    <button className={styles.button2}>
      <svg xmlns="http://www.w3.org/2000/svg" width="2" height="8" viewBox="0 0 2 8" fill="none">
        <path d="M1 1V7" stroke="#F0ECF1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

export function TextField({ value, onChange, placeholder }) {
  return (
    <div className={styles.textField1}>
      <input
        type="text"
        className={styles.textInput}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export function Dropdown({ title, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.dropdownContainer}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        {title}
        <span className={`${styles.arrow} ${isOpen ? styles.up : styles.down}`}></span>
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <div className={styles.dropdownOption} key={index}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function BookmarkBox({ children }) {
  return (
    <div className={styles.bookmarkBox}>
      {children} {/* BookmarkBox 내부에 자식 요소를 삽입할 수 있도록 설정 */}
    </div>
  );
}



export function BookmarkMiniBox({ children }) {
  return (
    <div className={styles.bookmarkminibox}>
      {children}
    </div>
  );
}

export function BookmarkText({ children }) {
  return (
    <div className={styles.bookmarktext}>
      {children}
    </div>
  );
}




