<script setup lang="ts">

</script>

<template>
  <div class="loading-box">
    <svg class="gegga">
      <defs>
        <filter id="gegga">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"
            result="inreGegga"
          />
          <feComposite in="SourceGraphic" in2="inreGegga" operator="atop" />
        </filter>
      </defs>
    </svg>
    <svg class="snurra" width="200" height="200" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="linjärGradient">
          <stop class="stopp1" offset="0" />
          <stop class="stopp2" offset="1" />
        </linearGradient>
        <linearGradient
          id="gradient" y2="160" x2="160" y1="40" x1="40" gradientUnits="userSpaceOnUse"
          xlink:href="#linjärGradient"
        />
      </defs>
      <path
        class="halvan"
        d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"
      />
      <circle class="strecken" cx="100" cy="100" r="64" />
    </svg>
    <svg class="skugga" width="200" height="200" viewBox="0 0 200 200">
      <path
        class="halvan"
        d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"
      />
      <circle class="strecken" cx="100" cy="100" r="64" />
    </svg>
  </div>
</template>

<style scoped>
.loading-box {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
      }

      .gegga {
        width: 0;
      }

      .snurra {
        filter: url(#gegga);
      }

      .stopp1 {
        stop-color: #f700a8;
      }

      .stopp2 {
        stop-color: #ff8000;
      }

      .halvan {
        animation: Snurra1 10s infinite reverse linear;
        stroke-dasharray: 180 800;
        fill: none;
        stroke: url(#gradient);
        stroke-width: 23;
        stroke-linecap: round;
      }

      .strecken {
        animation: Snurra1 3s infinite reverse linear;
        stroke-dasharray: 26 54;
        fill: none;
        stroke: url(#gradient);
        stroke-width: 23;
        stroke-linecap: round;
      }

      .skugga {
        filter: blur(5px);
        opacity: 0.3;
        position: absolute;
        transform: translate(3px, 3px);
      }

      @keyframes Snurra1 {
        0% {
          stroke-dashoffset: 0;
        }

        100% {
          stroke-dashoffset: -403px;
        }
      }
</style>
