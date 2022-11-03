const colorRampSvg = (
  <svg width="160" height="35">
    <image
      preserveAspectRatio="none"
      href="gradient.png"
      x="15"
      y="0"
      width="130"
      height="15"
    ></image>
    <g
      transform="translate(0,15)"
      fill="none"
      font-size="10"
      font-family="sans-serif"
      text-anchor="middle"
    >
      <path class="domain" stroke="currentColor" d="M15,6V0H145V6"></path>
      <g class="tick" opacity="1" transform="translate(15,0)">
        <line stroke="currentColor" y2="6" y1="-15"></line>
        <text fill="currentColor" y="9" dy="0.71em">
          100
        </text>
      </g>
      <g class="tick" opacity="1" transform="translate(80,0)">
        <line stroke="currentColor" y2="6" y1="-15"></line>
        <text fill="currentColor" y="9" dy="0.71em">
          0
        </text>
      </g>
      <g class="tick" opacity="1" transform="translate(145,0)">
        <line stroke="currentColor" y2="6" y1="-15"></line>
        <text fill="currentColor" y="9" dy="0.71em">
          100
        </text>
      </g>
    </g>
  </svg>
);

export const Legend = () => (
  <div class="map-overlay mixed">
    <p class="slider-legend-title">Percentage Point Margin</p>
    <div class="slider-legend-labels">
      <p class="label-left">Zeldin</p>
      <p class="label-right">Hochul</p>
    </div>
    <div class="slider-legend chart-key-mixed">{colorRampSvg}</div>
  </div>
);
