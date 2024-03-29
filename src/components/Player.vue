<script lang="ts" setup>
// Import styles.
import 'vidstack/player/styles/default/theme.css';
import 'vidstack/player/styles/default/layouts/audio.css';
import 'vidstack/player/styles/default/layouts/video.css';
// Register elements.
import 'vidstack/player';
import 'vidstack/player/layouts';
import 'vidstack/player/ui';

import {
  isHLSProvider,
  type MediaCanPlayEvent,
  type MediaProviderChangeEvent,
} from 'vidstack';
import type { MediaPlayerElement } from 'vidstack/elements';
import { onMounted, ref } from 'vue';

import { textTracks } from '../assets/tracks';

const props = defineProps({
  isAutoPlay: {
    type: Boolean,
    default: () => false,
  }
})

const $player = ref<MediaPlayerElement>()

onMounted(() => {
  /**
   * You can add these tracks using HTML as well.
   *
   * @example
   * ```html
   * <media-provider>
   *   <track label="..." src="..." kind="..." srclang="..." default />
   *   <track label="..." src="..." kind="..." srclang="..." />
   * </media-provider>
   * ```
   */
  document.body.click();
//   for (const track of textTracks) $player.value!.textTracks.add(track);
  console.log('$player.value!.textTracks', $player.value!.textTracks);

  // Subscribe to state updates - you can connect them to Vue refs if needed.
  return $player.value!.subscribe(({ paused, viewType }) => {
    console.log('is paused?', '->', paused);
    console.log('is audio view?', '->', viewType === 'audio');
  });
});

function onProviderChange(event: MediaProviderChangeEvent) {
  const provider = event.detail;
  // We can configure provider's here.
  if (isHLSProvider(provider)) {
    provider.config = {};
  }
}

// We can listen for the `can-play` event to be notified when the player is ready.
function onCanPlay(event: MediaCanPlayEvent) {
  // ...
  console.log('event', event);

}

</script>

<template>
  <media-player
    :autoplay="props.isAutoPlay"
    class="player"
    title="Sprite Fight"
    src="https://d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8"
    crossorigin
    playsinline
    @provider-change="onProviderChange"
    @can-play="onCanPlay"
    ref="$player"
  >
    <media-provider>
      <media-poster
        class="vds-poster"
        src="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=1200"
        alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
      />
    </media-provider>
    <!-- Layouts -->
    <!--thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"-->
    <media-video-layout
      thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"
    />
  </media-player>
</template>

<style scoped>
.player {
  --brand-color: #f5f5f5;
  --focus-color: #4e9cf6;

  --audio-brand: var(--brand-color);
  --audio-focus-ring-color: var(--focus-color);
  --audio-border-radius: 2px;

  --video-brand: var(--brand-color);
  --video-focus-ring-color: var(--focus-color);
  --video-border-radius: 2px;

  /* 👉 https://vidstack.io/docs/player/components/layouts/default#css-variables for more. */
}

.player[data-view-type='audio'] media-poster {
  display: none;
}

.player[data-view-type='video'] {
  aspect-ratio: 16 /9;
}

.src-buttons {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 40px;
  margin-inline: auto;
  max-width: 300px;
}
</style>
