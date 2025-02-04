import React, { useEffect, useState } from "react";

interface ToastNotificationProps {
    onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({onClose}) => {
    // 알림의 진행 상태(퍼센트)를 관리하는 상태
    const [progress, setProgress] = useState(100);  // 초기값은 100 (알림이 처음에 표시될 때)

    // 컴포넌트가 마운트될 때 실행되는 useEffect 훅
    useEffect(() => {
        const totalDuration = 2000; // 2초로 변경
        const progressInterval = totalDuration / 100; // progress가 1%씩 줄어드는 간격

        // progress를 감소시키는 타이머 설정
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev > 0) {
                    return prev - 1; // progress를 1%씩 감소
                } else {
                    clearInterval(timer); // progress가 0이 되면 타이머 중지
                    return 0; // progress를 0으로 설정
                }
            });
        }, progressInterval); // 일정한 간격으로 progress 감소

        // 2초 후에 알림을 닫는 타이머 설정
        const closeTimeout = setTimeout(() => {
            onClose(); // 토스트 알림 닫기
        }, totalDuration); // 2초 후에 실행

        // 컴포넌트가 언마운트되거나 타이머가 끝나면 타이머 정리
        return () => {
            clearInterval(timer);
            clearTimeout(closeTimeout);
        };
    }, [onClose]);

    return (
        <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg flex items-center p-4 w-72 z-[200]">
            <div className="flex items-center">
                {/* 체크 아이콘 */}
                <div className="rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    <div
                        className="inline-flex items-center justify-center w-10 h-10 mb-1 rounded-full"
                    >
                        <svg
                            viewBox="0 0 48 48"
                            height="100"
                            width="100"
                            y="0px"
                            x="0px"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <linearGradient
                                gradientUnits="userSpaceOnUse"
                                y2="37.081"
                                y1="10.918"
                                x2="10.918"
                                x1="37.081"
                                id="SVGID_1__8tZkVc2cOjdg_gr1"
                            >
                                <stop stop-color="#A4CAFE" offset="0"></stop>
                                <stop stop-color="#3F83F8" offset=".033"></stop>
                                <stop stop-color="#76A9FA" offset=".197"></stop>
                                <stop stop-color="#A4CAFE" offset=".362"></stop>
                                <stop stop-color="#C3DDFD" offset=".525"></stop>
                                <stop stop-color="#E1EFFE" offset=".687"></stop>
                                <stop stop-color="#E1EFFE" offset=".846"></stop>
                                <stop stop-color="#EBF5FF" offset="1"></stop>
                            </linearGradient>
                            <circle
                                fill="url(#SVGID_1__8tZkVc2cOjdg_gr1)"
                                r="18.5"
                                cy="24"
                                cx="24"
                            ></circle>
                            <path
                                d="M35.401,38.773C32.248,41.21,28.293,42.66,24,42.66C13.695,42.66,5.34,34.305,5.34,24	c0-2.648,0.551-5.167,1.546-7.448"
                                stroke-width="3"
                                stroke-miterlimit="10"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                stroke="#76A9FA"
                                fill="none"
                            ></path>
                            <path
                                d="M12.077,9.646C15.31,6.957,19.466,5.34,24,5.34c10.305,0,18.66,8.354,18.66,18.66	c0,2.309-0.419,4.52-1.186,6.561"
                                stroke-width="3"
                                stroke-miterlimit="10"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                stroke="#76A9FA"
                                fill="none"
                            ></path>
                            <polyline
                                points="16.5,23.5 21.5,28.5 32,18"
                                stroke-width="3"
                                stroke-miterlimit="10"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                stroke="#1C64F2"
                                fill="none"
                            ></polyline>
                        </svg>
                    </div>
                </div>
                <span className="text-black font-medium">로그인 성공</span>
            </div>
            {/* 닫기 버튼 */}
            <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                type="button"
            onClick={onClose}
            >
                &#x2715;  {/* 'x' 문자 */}
            </button>
            {/* 진행 상태 표시 바 */}
            <div className="absolute bottom-0 left-0 w-full h-1 rounded-b-lg overflow-hidden">
                <div
                    className="h-full bg-[#76A9FA]"
                    style={{ width: `${progress}%`, transition: `width 0.03s linear` }}
                />
            </div>
        </div>
    );
}

export default ToastNotification;