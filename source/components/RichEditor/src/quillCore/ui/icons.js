/* eslint-disable max-len */

export default {
  blockquote: `<svg viewbox="0 0 18 18">
                <rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"></rect>
                <rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"></rect>
                <path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"></path>
                <path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"></path>
              </svg>`,
  code: `<svg viewbox="0 0 18 18">
          <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline>
          <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline>
          <line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"></line>
        </svg>`,
  "code-block": `<svg viewbox="0 0 18 18">
                  <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline>
                  <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline>
                  <line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"></line>
                </svg>`,
  direction: {
    "": `<svg viewbox="0 0 18 18">
          <polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"></polygon>
          <line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"></line>
          <path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"></path>
          <rect class="ql-fill" height="11" width="1" x="11" y="4"></rect>
          <rect class="ql-fill" height="11" width="1" x="13" y="4"></rect>
        </svg>`,
    rtl: `<svg viewbox="0 0 18 18">
            <polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"></polygon>
            <line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"></line>
            <path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"></path>
            <rect class="ql-fill" height="11" width="1" x="5" y="4"></rect>
            <rect class="ql-fill" height="11" width="1" x="7" y="4"></rect>
          </svg>`
  },
  indent: {
    "+1": `<svg viewbox="0 0 18 18">
            <line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"></line>
            <line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"></line>
            <line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"></line>
            <polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"></polyline>
          </svg>`,
    "-1": `<svg viewbox="0 0 18 18">
            <line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"></line>
            <line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"></line>
            <line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"></line>
            <polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"></polyline>
          </svg>`
  },
  script: {
    sub: `<svg viewbox="0 0 18 18">
            <path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/>
            <path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/>
          </svg>`,
    super: `<svg viewbox="0 0 18 18">
              <path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/>
              <path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/>
            </svg>`
  },
  strike: `<svg viewbox="0 0 18 18">
            <line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"></line>
            <path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"></path>
            <path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"></path>
          </svg>`,
  table: `<svg viewbox="0 0 18 18">
            <rect class="ql-stroke" height="12" width="12" x="3" y="3"></rect>
            <rect class="ql-fill" height="2" width="3" x="5" y="5"></rect>
            <rect class="ql-fill" height="2" width="4" x="9" y="5"></rect>
            <g class="ql-fill ql-transparent">
              <rect height="2" width="3" x="5" y="8"></rect>
              <rect height="2" width="4" x="9" y="8"></rect>
              <rect height="2" width="3" x="5" y="11"></rect>
              <rect height="2" width="4" x="9" y="11"></rect>
            </g>
          </svg>`,
  video: `<svg viewbox="0 0 18 18">
            <rect class="ql-stroke" height="12" width="12" x="3" y="3"></rect>
            <rect class="ql-fill" height="12" width="1" x="5" y="3"></rect>
            <rect class="ql-fill" height="12" width="1" x="12" y="3"></rect>
            <rect class="ql-fill" height="2" width="8" x="5" y="8"></rect>
            <rect class="ql-fill" height="1" width="3" x="3" y="5"></rect>
            <rect class="ql-fill" height="1" width="3" x="3" y="7"></rect>
            <rect class="ql-fill" height="1" width="3" x="3" y="10"></rect>
            <rect class="ql-fill" height="1" width="3" x="3" y="12"></rect>
            <rect class="ql-fill" height="1" width="3" x="12" y="5"></rect>
            <rect class="ql-fill" height="1" width="3" x="12" y="7"></rect>
            <rect class="ql-fill" height="1" width="3" x="12" y="10"></rect>
            <rect class="ql-fill" height="1" width="3" x="12" y="12"></rect>
          </svg>`
};
/* eslint-enable max-len */
