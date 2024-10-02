'use client';

import React, { useState, useEffect } from 'react';
import styles from './MyStyles.module.css';
import Image from "next/image";
import Slider from "react-slick"; 

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
  // react-slick 슬라이더 설정 객체
  const settings = {
    dots: false, // 하단의 점 네비게이션 비활성화
    infinite: true, // 무한 루프 슬라이드 비활성화
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 2, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 한 번에 넘어갈 슬라이드 수
    arrows: true, // 좌우 화살표 버튼 표시 여부
    vertical: false, // 가로 슬라이드 방향 설정
    adaptiveHeight: false, // 높이 자동 조정 비활성화
    centerMode: false, // 슬라이드를 중앙에 정렬하지 않음
    swipeToSlide: true, // 슬라이드를 터치로 넘길 수 있게 설정
    className: `${styles.sliderWrapper} ${styles.customSlickContainer}`, // sliderWrapper 클래스 적용
  };

  return (
    <div className={styles.sliderWrapper} style={{ ...style }}>
      <Slider {...settings}>
        <div className={styles.slickSlide}>
          <Dreamcard1 />
        </div>
        <div className={styles.slickSlide}>
          <Dreamcard2 />
        </div>
      </Slider>
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


// Dropdown 컴포넌트
export function Dropdown({ selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운 열림/닫힘 상태를 토글하는 함수
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 드롭다운에 표시할 옵션들
  const options = ['최신순', '등록순'];

  return (
    <div className={styles.dropdownWrapper} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', position: 'relative' }}>
      {/* 드롭다운 버튼 */}
      <button onClick={toggleDropdown} className={styles.dropdownButton} style={{ backgroundColor: 'transparent', border: 'none' }}>
        {selected} {/* 선택된 옵션 표시 */}
        <Image
          src="/images/arrow_drop_down.svg"
          alt="Dropdown Arrow"
          width={20}
          height={20}
          className={isOpen ? styles.arrowUp : styles.arrowDown}
        />
      </button>

      {/* 드롭다운 메뉴: 선택된 옵션을 제외한 다른 옵션만 표시 */}
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options
            .filter(option => option !== selected) // 선택된 옵션 제외 필터링
            .map(option => (
              <div
                key={option}
                className={styles.dropdownItem}
                onClick={() => { onSelect(option); setIsOpen(false); }} // 선택된 옵션 업데이트
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
              >
                {option} {/* 선택된 옵션 제외한 옵션만 표시 */}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}


export function DiaryListItem({ diary }) {
  // 북마크 상태를 관리하는 state
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 북마크 버튼 클릭 이벤트 처리 함수
  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked); // 클릭할 때마다 북마크 상태 변경
  };
  return (
    <div className="diaryBigbox" style={{ display: "flex", alignItems: "start", gap: "16px", marginBottom: "12px",marginLeft:"16px",marginRight:"16px" }}>
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
              src={isBookmarked ? "/images/bookmark_gray.svg" : "/images/bookmark_white.svg"}
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


  // MainContainer 컴포넌트 정의
export function MainContainer({ children }) {
  return (
    <div className={styles.mainContainer}>
      {children} {/* MainContainer 안에 자식 요소를 렌더링 */}
    </div>
  );
}


// MainContent 컴포넌트 정의
export function MainContent({ result }) {
  const [selectedSort, setSelectedSort] = useState(''); // 초기값을 빈 문자열로 설정하여 로딩 상태를 반영
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  // 페이지가 처음 렌더링될 때 localStorage에서 저장된 정렬 기준을 가져옴
  useEffect(() => {
    const savedSort = localStorage.getItem('selectedSort');
    if (savedSort) {
      setSelectedSort(savedSort); // 저장된 정렬 기준이 있으면 상태 업데이트
    } else {
      setSelectedSort('최신순'); // 저장된 정렬 기준이 없으면 기본값으로 설정
    }
    setIsLoading(false); // 로딩 상태 해제
  }, []);

  // 사용자가 정렬 기준을 변경할 때 localStorage에 저장
  const handleSortChange = (option) => {
    setSelectedSort(option); // 선택된 정렬 기준 업데이트
    localStorage.setItem('selectedSort', option); // localStorage에 저장
  };

  // 선택된 정렬 기준에 따라 result를 정렬
  const sortedResult = [...result].sort((a, b) => {
    if (selectedSort === '최신순') {
      return new Date(b.created_at) - new Date(a.created_at); // 최신순 정렬
    } else {
      return new Date(a.created_at) - new Date(b.created_at); // 등록순 정렬
    }
  });

  const leftContent = <span style={{ color: "#F0ECF1" }}>꿈 보관함</span>;
  const rightContent = <FluentPerson />;

  const left = <div>전체</div>;
  const right = <Dropdown selected={selectedSort} onSelect={handleSortChange} style={{ marginLeft: "275px" }} />;

  // 로딩 중일 때는 아무것도 렌더링하지 않도록 설정
  if (isLoading) {
    return null; // 로딩 상태일 때는 아무것도 렌더링하지 않음
  }

  return (
    <div className={styles.mainContent}>
      <TopBar leftContent={leftContent} rightContent={rightContent} />
      <BookmarkBox>
        <BookmarkMiniBox style={{ display: 'flex', alignItems: 'center' }}>
          <FluentSparkle />
          <BookmarkText style={{ marginLeft: '8px' }}>북마크</BookmarkText>
        </BookmarkMiniBox>

        <DreamcardBox>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
            <Dreamcard1 style={{ flexShrink: 0, width: '180px', height: '113px', borderRadius: '12px' }} />
            <Dreamcard2 style={{ flexShrink: 0, width: '180px', height: '113px', borderRadius: '12px' }} />
          </div>
        </DreamcardBox>
      </BookmarkBox>

      <AlignContainer
        left={left}
        right={right}
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
      />

      {/* DiaryListItem을 스크롤 가능하도록 설정 */}
      <div style={{ height: '500px', overflow: 'auto' }}>
        {sortedResult.length > 0 ? (
          sortedResult.map((diary, index) => (
            <DiaryListItem key={index} diary={diary} />
          ))
        ) : (
          <p>No diaries found for the current user.</p>
        )}
      </div>
    </div>
  );
}