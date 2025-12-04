"use client"

import React from "react"

interface DownloadButtonProps {
    label?: string
    onDownload?: () => void
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ label = "Download", onDownload }) => {
    return (
        <div className="download-btn-container">
            <label className="label" onClick={onDownload}>
                <input type="checkbox" className="input" />
                <span className="circle">
                    <svg
                        className="icon"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 19V5m0 14-4-4m4 4 4-4"
                        ></path>
                    </svg>
                    <div className="square"></div>
                </span>
                <p className="title">{label}</p>
                <p className="title">Open</p>
            </label>
            <style jsx>{`
        .download-btn-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .label {
          background-color: transparent;
          border: 2px solid rgb(255, 77, 0);
          display: flex;
          align-items: center;
          border-radius: 50px;
          width: 140px;
          cursor: pointer;
          transition: all 0.4s ease;
          padding: 4px;
          position: relative;
          height: 40px;
        }
        .label::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: #fff;
          width: 8px;
          height: 8px;
          transition: all 0.4s ease;
          border-radius: 100%;
          margin: auto;
          opacity: 0;
          visibility: hidden;
        }
        .label .input {
          display: none;
        }
        .label .title {
          font-size: 13px;
          font-weight: bold;
          color: rgb(255, 77, 0);
          transition: all 0.4s ease;
          position: absolute;
          right: 16px;
          bottom: 10px;
          text-align: center;
          margin: 0;
        }
        .label .title:last-child {
          opacity: 0;
          visibility: hidden;
        }
        .label .circle {
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background-color: rgb(255, 77, 0);
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.4s ease;
          position: relative;
          box-shadow: 0 0 0 0 rgb(255, 255, 255);
          overflow: hidden;
        }
        .label .circle .icon {
          color: #fff;
          width: 16px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }
        .label .circle .square {
          aspect-ratio: 1;
          width: 8px;
          border-radius: 2px;
          background-color: #fff;
          opacity: 0;
          visibility: hidden;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }
        .label .circle::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          background-color: #cc3d00;
          width: 100%;
          height: 0;
          transition: all 0.4s ease;
        }
        .label:has(.input:checked) {
          width: 40px;
          animation: installed 0.4s ease 3.5s forwards;
          border-color: transparent;
          background-color: transparent;
        }
        .label:has(.input:checked)::before {
          animation: rotate 3s ease-in-out 0.4s forwards;
        }
        .label .input:checked + .circle {
          animation: pulse 1s forwards, circleDelete 0.2s ease 3.5s forwards;
          rotate: 180deg;
        }
        .label .input:checked + .circle::before {
          animation: installing 3s ease-in-out forwards;
        }
        .label .input:checked + .circle .icon {
          opacity: 0;
          visibility: hidden;
        }
        .label .input:checked ~ .circle .square {
          opacity: 1;
          visibility: visible;
        }
        .label .input:checked ~ .title {
          opacity: 0;
          visibility: hidden;
        }
        .label .input:checked ~ .title:last-child {
          animation: showInstalledMessage 0.4s ease 3.5s forwards;
        }
        @keyframes pulse {
          0% {
            scale: 0.95;
            box-shadow: 0 0 0 0 rgba(255, 77, 0, 0.7);
          }
          70% {
            scale: 1;
            box-shadow: 0 0 0 16px rgba(255, 77, 0, 0);
          }
          100% {
            scale: 0.95;
            box-shadow: 0 0 0 0 rgba(255, 77, 0, 0);
          }
        }
        @keyframes installing {
          from {
            height: 0;
          }
          to {
            height: 100%;
          }
        }
        @keyframes rotate {
          0% {
            transform: rotate(-90deg) translate(27px) rotate(0);
            opacity: 1;
            visibility: visible;
          }
          99% {
            transform: rotate(270deg) translate(27px) rotate(270deg);
            opacity: 1;
            visibility: visible;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }
        @keyframes installed {
          100% {
            width: 140px;
            border-color: rgb(35, 174, 35);
            background-color: transparent;
          }
        }
        @keyframes circleDelete {
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }
        @keyframes showInstalledMessage {
          100% {
            opacity: 1;
            visibility: visible;
            right: 48px;
            color: rgb(35, 174, 35);
          }
        }
      `}</style>
        </div>
    )
}
