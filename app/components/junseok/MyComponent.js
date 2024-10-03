'use client';

import React, { useState, useEffect } from 'react';
import styles from './MyStyles.module.css';
import Image from "next/image";
import Slider from "react-slick"; 
import axios from 'axios'; // API 요청을 위해 axios를 사용

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

export function DreamcardBox({ result = [] }) {
  const bookmarkedDiaries = result.filter(diary => diary.is_bookmark);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: bookmarkedDiaries.length < 2 ? 1 : 2, // 슬라이드 개수 조정
    slidesToScroll: 1,
    arrows: true,
    vertical: false,
    adaptiveHeight: true,
    swipeToSlide: true,
    className: `${styles.sliderWrapper} ${styles.customSlickContainer}`, // customSlickContainer 스타일 적용
  };

  return (
    <div className={styles.sliderWrapper}>
      <Slider {...settings}>
        {bookmarkedDiaries.map((diary, index) => (
          <div className={styles.slickSlide} key={diary._id}>
            <a href={`chat/${diary._id}`} className={styles.diaryTitle}>
            <Image
              src={`/images/${diary._id}.webp`}
              alt="Bookmarked Dream"
              width={180}
              height={113}
              style={{ objectFit: 'cover', borderRadius: '12px' }}
            />
            </a>
          </div>
        ))}
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


export function DiaryListItem({ diary, onBookmarkUpdate }) {
  const [isBookmarked, setIsBookmarked] = useState(diary.is_bookmark);

  // 북마크 버튼 클릭 이벤트 처리 함수
  const handleBookmarkClick = async () => {
    try {
      const newBookmarkState = !isBookmarked;

      // UI에서 상태 즉시 반영
      setIsBookmarked(newBookmarkState);

      // DB에 업데이트 요청 보내기
      await axios.post('/api/bookmark', {
        diaryId: diary._id,
        isBookmark: newBookmarkState,
      });

      // 부모 컴포넌트에 알림
      onBookmarkUpdate(); 
    } catch (error) {
      console.error('Failed to update bookmark:', error);

      // 오류가 발생하면 상태 롤백
      setIsBookmarked(!newBookmarkState);
    }
  };

  return (
    <div className="diaryBigbox" style={{ display: "flex", alignItems: "start", gap: "16px", marginBottom: "12px", marginLeft:"16px",marginRight:"16px" }}>
      {/* 이미지 */}
      <img src={`/images/${diary._id}.webp`} alt="Diary Icon" style={{ width: "112px", height: "112px", borderRadius: "12px" }} />

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
            // isBookmarked 상태에 따라 이미지 변경
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


export function MainContent({ initialResult }) {
  const [result, setResult] = useState(initialResult || []); // 초기값을 서버에서 전달된 result로 설정
  const [selectedSort, setSelectedSort] = useState('최신순');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  // 북마크 업데이트 후 데이터 다시 가져오기
const fetchUpdatedData = async () => {
  try {
    const { data } = await axios.get('/api/getDiaries');
    console.log("Fetched Diaries: ", data); // 서버에서 가져온 데이터를 확인
    setResult(data); // result 상태를 업데이트
  } catch (error) {
    console.error('Failed to fetch diaries:', error);
  }
};

  // 북마크 업데이트 핸들러 (DiaryListItem 컴포넌트에서 호출)
  const handleBookmarkUpdate = () => {
    fetchUpdatedData(); // 데이터를 다시 가져옴
  };

  // 정렬 기준에 따라 result를 정렬
  const sortedResult = [...result].sort((a, b) => {
    if (selectedSort === '최신순') {
      return new Date(b.created_at) - new Date(a.created_at);
    } else {
      return new Date(a.created_at) - new Date(b.created_at);
    }
  });

  const leftContent = <span style={{ color: "#F0ECF1" }}>꿈 보관함</span>;
  const rightContent = <FluentPerson />;

  const left = <div>전체</div>;
  const right = <Dropdown selected={selectedSort} onSelect={setSelectedSort} style={{ marginLeft: "275px" }} />;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.mainContent}>
      <TopBar leftContent={leftContent} rightContent={rightContent} />

      <BookmarkBox>
        <BookmarkMiniBox style={{ display: 'flex', alignItems: 'center' }}>
          <FluentSparkle />
          <BookmarkText style={{ marginLeft: '8px' }}>북마크</BookmarkText>
        </BookmarkMiniBox>

        {/* DreamcardBox에 필터링된 result 전달 */}
        <DreamcardBox result={sortedResult.filter(diary => diary.is_bookmark)} />
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
            <DiaryListItem key={index} diary={diary} onBookmarkUpdate={handleBookmarkUpdate} />
          ))
        ) : (
          <p>No diaries found for the current user.</p>
        )}
      </div>
    </div>
  );
}