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
    <a href="/mypage" >
      <Image 
        src="/images/fluent_person-16-regular.svg" 
        alt="My image" 
        width={28} 
        height={28} 
      />
    </a>
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

export function FluentSparkle() {
  return (
    <Image src="/images/fluent_sparkle-28-filled.svg" alt="My image" width={24} height={24}  />
  );
}

export function DreamcardBox({ children, style }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '12px',
        overflowX: 'auto', // 슬라이드 가능하도록 설정
        padding: '0px 0px',
        ...style, // 외부에서 전달된 스타일 병합
      }}
    >
      {children}
    </div>
  );
}

export function Dreamcard1() {
  return (
    <div style={{ flexShrink: 0, borderRadius: '12px' }}>
      <Image 
        src="/images/bookmark-dreamcard1.png" 
        alt="Dream card 1" 
        width={180} 
        height={113} 
        style={{ objectFit: 'cover', borderRadius: '12px' }}
      />
    </div>
  );
}

export function Dreamcard2() {
  return (
    <div style={{ flexShrink: 0, borderRadius: '12px' }}>
      <Image 
        src="/images/bookmark-dreamcard2.png" 
        alt="Dream card 2" 
        width={180} 
        height={113}
        style={{ objectFit: 'cover', borderRadius: '12px' }} 
      />
    </div>
  );
}


export function AlignContainer({ left, right }) {
  return (
    <div className={styles.alignContainer} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
      <div className={styles.textleft}>{left}</div>
      <div className={styles.alignminibox}>
        <div >{right}</div>
      </div>
    </div>
  );
}

export function Dreamlistbigbox({ children }) {
  return (
    <div className={styles.dreamlistbigbox}>
      <Dreamlistbox>

      </Dreamlistbox>
      {children}
    </div>
  );
}

export function Dreamlistbox({ children }) {
  return (
    <div className={styles.dreamlistbox}>
      {children}
    </div>
  );
}


export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림/닫힘 상태 관리
  const [selected, setSelected] = useState('최신순'); // 선택된 드롭다운 옵션 관리

  // 드롭다운 버튼 클릭 시 상태를 토글하는 함수
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 드롭다운 옵션 선택 시 상태를 변경하는 함수
  const selectOption = (option) => {
    setSelected(option); // 선택된 옵션 업데이트
    setIsOpen(false); // 드롭다운 닫기
  };

  return (
    <div className={styles.dropdownWrapper} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', position: 'relative' }}>
      {/* 드롭다운 버튼 */}
      <button onClick={toggleDropdown} className={styles.dropdownButton}>
        {selected} {/* 선택된 옵션 표시 */}
        <Image
          src="/images/arrow_drop_down.svg" // 드롭다운 화살표 이미지
          alt="Dropdown Arrow"
          width={20}
          height={20}
          className={isOpen ? styles.arrowUp : styles.arrowDown} // 상태에 따라 스타일 변경
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div
            className={styles.dropdowntext}
            onClick={() => selectOption('최신순')}
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} // 최신순 텍스트 스타일 적용
          >
            최신순
          </div>
          <div
            className={styles.dropdowntext}
            onClick={() => selectOption('날짜순')}
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            날짜순
          </div>
        </div>
      )}
    </div>
  );
};

export function DiaryListItem({ diary }) {
  // 북마크 상태를 관리하는 state
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 북마크 버튼 클릭 이벤트 처리 함수
  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked); // 클릭할 때마다 북마크 상태 변경
  };
  return (
    <div className="diaryBigbox" style={{ display: "flex", alignItems: "start", gap: "16px", marginBottom: "10px" }}>
      {/* 이미지 */}
      <img src={`/images/${diary._id}.webp`} alt="Diary Icon" style={{ width: "112px", height: "112px",borderRadius: "12px" }} />
      {/* Image placed on the left */}
    {/* 이미지 옆에 전체 Flexbox를 추가 */}
    <div className={styles.diaryContentContainer}>
        {/* 제목과 날짜를 포함하는 TitleBox */}
        <div className={styles.titleBox}>
          <a href={`chat/${diary._id}`} className={styles.diaryTitle}>{diary.title}</a>
          <p className={styles.diaryDate}>{new Date(diary.created_at).toLocaleString()}</p>
        </div>

      {/* 북마크 버튼을 포함하는 diarybookmarkbox */}
      <div className={styles.diarybookmarkbox}>
            <img
              src={isBookmarked ? "/images/bookmark_white.svg" : "/images/bookmark_gray.svg"}
              alt="Bookmark Icon"
              className={styles.bookmarkIcon}
              onClick={handleBookmarkClick}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    );
  }

  export  function FloatingButton() {
    return (
      <a href={`/chat`} className={styles.floatingButton}>
        <img src="/images/floating_button.svg" alt="Floating Button" className={styles.floatingButtonImage} />
      </a>
    );
  }