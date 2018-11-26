import React from "react";

// https://thenounproject.com/term/battery/14009/
export default function Battery({ level, charging }) {
  return (
    <svg viewBox="0 0 34 98">
      <defs>
        <linearGradient id="progress" x1="0" y1="1" x2="0" y2="0">
          <stop id="stop1" offset={level} stopColor="#37F53B" />
          <stop
            id="stop2"
            offset={level}
            stopColor="#ffffff"
            stopOpacity="0.3"
          />
        </linearGradient>
      </defs>
      <path
        fill="url(#progress)"
        d="M32.016,4.813 L24.102,4.813 L24.102,1.127 C24.102,0.689 23.746,0.333 23.307,0.333 L11.142,0.333 C10.703,0.333 10.347,0.69 10.347,1.127 L10.347,4.813 L2.432,4.813 C1.364,4.813 0.498,5.677 0.498,6.745 L0.498,96.066 C0.498,97.131 1.364,98 2.432,98 L32.015,98 C33.082,98 33.949,97.136 33.949,96.066 L33.949,6.745 C33.949,5.677 33.084,4.813 32.016,4.813 Z"
      />
      {charging && (
        <polygon
          fill="yellow"
          points="16.96 75.677 16.96 55.544 13.156 58.984 16.96 30.246 16.96 50.953 21.291 48.207"
        />
      )}
      <text
        x="17"
        y="88"
        alignmentBaseline="middle"
        fontSize="11"
        fill="#333"
        textAnchor="middle"
        style={{
          fontFamily:
            "-apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'"
        }}
      >
        {level * 100}%
      </text>
    </svg>
  );
}
