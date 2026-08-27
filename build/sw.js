importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);
workbox.precaching.precacheAndRoute([{"revision":"c5977ce9c754b5132685edd57010bd0a","url":"assets/audios/are-you-sure.mp3"},{"revision":"c674d0c4d88be820b733641063731555","url":"assets/audios/ButtonClick.mp3"},{"revision":"ff18cdfcc17d250221a1208277cf9bab","url":"assets/audios/Cheering-01.mp3"},{"revision":"f9c92d172d912d7cd3e86e0cad6c02e4","url":"assets/audios/Cheering-02.mp3"},{"revision":"eb47f155aa00e2f3ee823eabd8bd78cf","url":"assets/audios/Cheering-03.mp3"},{"revision":"44a04b553aa770fa3e89df6bb93fdee5","url":"assets/audios/CorrectStoneFinal.mp3"},{"revision":"787b3d404c2977c05e7d351c499c257f","url":"assets/audios/Disapointed-05.mp3"},{"revision":"5ef47da84396ad9a4b83235b87211c04","url":"assets/audios/Eat.mp3"},{"revision":"21a9071743deb5ef58f5a44ced6ec3ac","url":"assets/audios/intro.mp3"},{"revision":"3640996919d363bf8e9ac31c6d84be7c","url":"assets/audios/LevelLoseFanfare.mp3"},{"revision":"7f521e9dce3586ddaa0c1c5db030ea13","url":"assets/audios/LevelWinFanfare.mp3"},{"revision":"227040add97b1daecd5c21c2623e480a","url":"assets/audios/Monster Spits wrong stones-01.mp3"},{"revision":"227040add97b1daecd5c21c2623e480a","url":"assets/audios/MonsterSpit.mp3"},{"revision":"cf0c6919347cc45bc20028d6155aa5d7","url":"assets/audios/onDrag.mp3"},{"revision":"828da03d5334d4d2a5ef162941982807","url":"assets/audios/PointsAdd.wav"},{"revision":"685da4a6886babc85061d0ab8224a0cf","url":"assets/audios/timeout.mp3"},{"revision":"de7115a8c367285f9d3b0203eca4941b","url":"assets/images/Autumn_bg_v01.webp"},{"revision":"c830df1ef1de5b4b9e7c0863c1fef84e","url":"assets/images/Autumn_fence_v01.png"},{"revision":"6a02071fda126f5f5e8d3dfdb86934f3","url":"assets/images/Autumn_fence_v01.webp"},{"revision":"d13cd2f9ccda5c2488e3be8882d1c28c","url":"assets/images/Autumn_FG_v01.png"},{"revision":"f378f0c9469cb8418cb0b7b41ecef464","url":"assets/images/Autumn_hill_v01.webp"},{"revision":"c876bf318194745942b4dfcee1a49d21","url":"assets/images/Autumn_sign_v01.png"},{"revision":"7432f4abb9a3a9a0270c45581f7ed2a8","url":"assets/images/Autumn_sign_v01.webp"},{"revision":"ed13d6ecc0d34495be15c675159b9b38","url":"assets/images/back_btn.png"},{"revision":"728228dd61fdf648a0029f6236099c40","url":"assets/images/back_btn.webp"},{"revision":"560f4838191a205dc573b57c197df805","url":"assets/images/bar_empty_v01.png"},{"revision":"c08f6412c0b44c13b5b05c0724fa15bb","url":"assets/images/bar_empty_v01.webp"},{"revision":"811d3537ac3d81d68ec6f9484d78540c","url":"assets/images/bar_full_v01.png"},{"revision":"10e4b19b33603aefbf9e43423e3b91c0","url":"assets/images/bar_full_v01.webp"},{"revision":"854e402d233f6658e371ed2731ae0848","url":"assets/images/bg_v01.webp"},{"revision":"04400c699e8ed154f3d3105e4810c878","url":"assets/images/close_btn.png"},{"revision":"3a54f5fe0867c02cf0c8c957ff6288d5","url":"assets/images/close_btn.webp"},{"revision":"3869f8c8c1968fe631f75ed58c6fd642","url":"assets/images/cloud_01.png"},{"revision":"a124d8feb61f0831c695fa3336028b14","url":"assets/images/cloud_02.png"},{"revision":"f06efec2148a869560c62b9e92977d31","url":"assets/images/cloud_03.png"},{"revision":"d942a07661b0c7c6ad18b0e282032625","url":"assets/images/confirm_btn.png"},{"revision":"f329227c7aeaf9052d03db30bb65f4fe","url":"assets/images/confirm_btn.webp"},{"revision":"1350b5f674e27b519d6b242e34fa89b3","url":"assets/images/drag11.png"},{"revision":"b8ea0a9b2cd0b87e65c20fa0c37c10b3","url":"assets/images/drag12.png"},{"revision":"8587d49e26e088c9a699eeb6eb1016f5","url":"assets/images/drag13.png"},{"revision":"ceaa078e3b531e5be6fa961345310b23","url":"assets/images/drag14.png"},{"revision":"94bfc399f9f62de8fbf29570d7b92673","url":"assets/images/eat11.png"},{"revision":"c616ba8fc73b2c6c1ce49eede78ca9a1","url":"assets/images/eat12.png"},{"revision":"a64bc08bc09217b46913150e4939cbbe","url":"assets/images/eat13.png"},{"revision":"806ee606f7857d67e602d3a9489411c6","url":"assets/images/eat14.png"},{"revision":"c3a1dae9760ce63dfe6d75e34dc71515","url":"assets/images/favicon.png"},{"revision":"08c13cf2d001c34a061bc50569aa9a70","url":"assets/images/fence_v01.webp"},{"revision":"f7d928f4be1334f26eef786354f93d3a","url":"assets/images/FG_a_v01.png"},{"revision":"59651e22c6f0fb7e161c9dd39099e205","url":"assets/images/ftm_bonus_level_monsters.png"},{"revision":"4b197caf1470aef173a65c6b5be858eb","url":"assets/images/happy11.png"},{"revision":"471e75317cae385afe5ef253cf79a832","url":"assets/images/happy12.png"},{"revision":"7f38b5b3aad04f3f66fd9044209f53cf","url":"assets/images/happy13.png"},{"revision":"572d46ff594e0d75dfa9774d586d31bb","url":"assets/images/happy14.png"},{"revision":"f26e48eebd92015148bad21d0f00397c","url":"assets/images/hill_v01.webp"},{"revision":"6a08ea80964f37a2c5d259e0927f06c6","url":"assets/images/idle11.png"},{"revision":"b4341f8c7888e38794176ce9a34baa9d","url":"assets/images/idle12.png"},{"revision":"aaef5b41913a41577b8383e14ca814cc","url":"assets/images/idle13.png"},{"revision":"cff1fe8638fda41e43d840077cae784f","url":"assets/images/idle14.png"},{"revision":"218d97fee4120b92b272d8434a0f8385","url":"assets/images/idle4.png"},{"revision":"a5a78c7c8206fee9a9de3125ff38344b","url":"assets/images/levels_v01.png"},{"revision":"f9c7262c8e44c42c49efecb3687a46a0","url":"assets/images/levels_v01.webp"},{"revision":"b004ea63234f8b0fd004a94390439cc6","url":"assets/images/loadingImg.gif"},{"revision":"91d7393cd824adb641c6d26d8ca61b76","url":"assets/images/map_btn.png"},{"revision":"fdf67ed5429a16f787a5cec5d6b25d0a","url":"assets/images/map_btn.webp"},{"revision":"e0a073a7781c372a80703d7f8f1158b7","url":"assets/images/map_icon_monster_level_v01.png"},{"revision":"e708d01e8794e06d918c1408e69feff5","url":"assets/images/map_icon_monster_level_v01.webp"},{"revision":"76f43b471d06617a870d3334cc555aa4","url":"assets/images/map.webp"},{"revision":"6efd36d289e7612842b17e578881b488","url":"assets/images/mapIcon.png"},{"revision":"d6ee4e553124d0746460e54ec2f540d5","url":"assets/images/mapIcon.webp"},{"revision":"b0bfb771964c3bc1c91b83fe74473c3a","url":"assets/images/mapLock.png"},{"revision":"914eb4c1d5d6f9bf924d5da636dea0fc","url":"assets/images/mapLock.webp"},{"revision":"82cfadbfb7caf59ee5ae3593b1ca6ff6","url":"assets/images/next_btn.png"},{"revision":"31378e5bd67b834a8433ba143ede5320","url":"assets/images/next_btn.webp"},{"revision":"582fd49aaf299e2d9bc97901a7e30100","url":"assets/images/pause_v01.png"},{"revision":"d528ae79e7e33a9f19942e698cf5a4c7","url":"assets/images/pause_v01.webp"},{"revision":"9352da833ff61d3668e32cf14254aa99","url":"assets/images/pinStar1.png"},{"revision":"b3e93c218a926b91b4bc8ab02ad46621","url":"assets/images/pinStar1.webp"},{"revision":"bef373e670bee8818e08f334a3fb73ef","url":"assets/images/pinStar2.png"},{"revision":"bbc6723de51855b93626632611884c7b","url":"assets/images/pinStar2.webp"},{"revision":"eb96cc5290ea049dfe0965ee916f1284","url":"assets/images/pinStar3.png"},{"revision":"d1bfb9edb3c6f4c0dd8b46975064e44c","url":"assets/images/pinStar3.webp"},{"revision":"fef14ec59bab911868c25887fba98f4a","url":"assets/images/Play_button.png"},{"revision":"3a62dd938efdb92f41d17b7bf24c5175","url":"assets/images/Play_button.webp"},{"revision":"4e2a11466004c4a0afe1775a61903358","url":"assets/images/popup_bg_v01.png"},{"revision":"35978a3b285ea9fc2ac5dbfba188aaa4","url":"assets/images/popup_bg_v01.webp"},{"revision":"06852c915891b6d81843dc7fef23b89d","url":"assets/images/promptPlayButton.png"},{"revision":"d5a08a0792dc36dcbe7cb8bd8745e194","url":"assets/images/promptPlayButton.webp"},{"revision":"5fe917dfbe93a3b085b1d94d9b85d78b","url":"assets/images/promptTextBg.png"},{"revision":"01a9f2047ff3107785361601e0f5393d","url":"assets/images/promptTextBg.webp"},{"revision":"c44bd4f366f2ccb2e101e52398849b90","url":"assets/images/retry_btn.png"},{"revision":"cbcda940c59d8690e451a414da819ad7","url":"assets/images/retry_btn.webp"},{"revision":"74d85c6202ad54434488a90308ca3cf2","url":"assets/images/sad11.png"},{"revision":"7863fd28e5a298cf880cddb0117883e3","url":"assets/images/sad12.png"},{"revision":"ba2597cc679647cffe99ecdc60cfe359","url":"assets/images/sad13.png"},{"revision":"60d5655721b2b8fea479633d6074c061","url":"assets/images/sad14.png"},{"revision":"bad694f5e8e05d5213b35b64a2ab0b57","url":"assets/images/score_v01.png"},{"revision":"4a8480ecb98fe98d2df90216d95994f4","url":"assets/images/spit11.png"},{"revision":"f3413db8c0f39e3d2e2ad2f12705a005","url":"assets/images/spit12.png"},{"revision":"5b967eb0134df327c3b9bf5b21d98f1c","url":"assets/images/spit13.png"},{"revision":"1ed15747e0d9e239a5f85bf1da5e4082","url":"assets/images/spit14.png"},{"revision":"7d8ef7490feb42e873b57931fedb6bdb","url":"assets/images/star.png"},{"revision":"dcf69c19c96454cf21316f59b6cd92fe","url":"assets/images/star.webp"},{"revision":"2d0bb7af6aafefa12d1dff0f82ea4606","url":"assets/images/stone_pink_v02.png"},{"revision":"308a0a0b555f25a0a09e029390adae04","url":"assets/images/stone_pink.png"},{"revision":"582f27958cca8386cb5f0d4e362e5ac4","url":"assets/images/stone_pink.webp"},{"revision":"b6fd372111f6d3e055474ae36d18643f","url":"assets/images/timer_empty.png"},{"revision":"b2747e7be9a0ee8fb520f6ae017ecba0","url":"assets/images/timer_empty.webp"},{"revision":"56b871b3e599b4e0ef45f5b72cc7090b","url":"assets/images/timer_full.png"},{"revision":"2e08c910b6c8b3ff840b00504cb30c69","url":"assets/images/timer.png"},{"revision":"03c56f519bdbcdea826b62fc802d219b","url":"assets/images/timer.webp"},{"revision":"7ae11a882e61ffcdc8f4ce625a6f7022","url":"assets/images/Totem_v02_v01.webp"},{"revision":"dd108b7a538f7ed7e3430e0330b19d57","url":"assets/images/tutorial_hand.png"},{"revision":"05fad319d9b251f53a4e7fee41fce866","url":"assets/images/tutorial_hand.webp"},{"revision":"658f5531c9ebe5b76c50588fa7af3c67","url":"assets/images/WIN_screen_bg.webp"},{"revision":"a1b10462c9b6ce3a5e298dc2b822a7c4","url":"assets/images/Winter_bg_01.webp"},{"revision":"b0c3fd24d5b3d6bfbaf9cba11a08b3ab","url":"assets/images/Winter_fence_v01.png"},{"revision":"fed8afe3c6d3b19c839d9c5211b93b3c","url":"assets/images/Winter_fence_v01.webp"},{"revision":"7918af1085a895705022afac666d39cf","url":"assets/images/Winter_FG_v01.png"},{"revision":"ebc37732c9b94482c57b2eda899d6e34","url":"assets/images/Winter_hill_v01.webp"},{"revision":"d896db85dc246e5aad108f9862f1b0e2","url":"assets/images/Winter_sign_v01.png"},{"revision":"9cb87e28c648d10bb283b5aa73a05ce8","url":"assets/images/Winter_sign_v01.webp"},{"revision":"d98f943dd4e73f81aba2465e9369b116","url":"feedTheMonster.js"},{"revision":"d0fd859bf6ad73404cf7443e52800acd","url":"index.css"},{"revision":"76fc1b7c94866ca6c8eacbfff9801048","url":"index.html"},{"revision":"82b35f45a84db25b80f22e2c9006ad18","url":"manifest.json"}], {
  ignoreURLParametersMatching: [/^cr_/],
  exclude: [/^lang\//],
});
var number = 0;
var version = 1.26;
// self.addEventListener('activate', function(e) {
//     console.log("activated");
//
//
// });

self.addEventListener("install", async function (e) {
  self.skipWaiting();
});
const channel = new BroadcastChannel("my-channel");
self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});
channel.addEventListener("message", async function (event) {
  if (event.data.command === "Cache") {
    number = 0;
    await getCacheName(event.data.data);
  }
  if (event.data.command === "CacheUpdate") {
    caches.delete(workbox.core.cacheNames.precache + event.data.data);
    await getCacheName(event.data.data);
  }
});

self.registration.addEventListener("updatefound", function (e) {
  caches.keys().then((cacheNames) => {
    cacheNames.forEach((cacheName) => {
      if (cacheName == workbox.core.cacheNames.precache) {
        // caches.delete(cacheName);
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) =>
            client.postMessage({ msg: "Update Found" })
          );
        });
      }
    });
  });
});

async function cacheLangAssets(file, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(file);

  if (!cachedResponse) {
    await cache.add(file);
    console.log('Cached File:', file);
  } else {
    console.log('File already cached, skipping:', file);
  }
}
async function getCacheName(language) {
  await caches.keys().then((cacheNames) => {
    cacheNames.forEach(async (cacheName) => {
      await getALLAudioUrls(cacheName, language);
    });
  });
}

async function getALLAudioUrls(cacheName, language) {
  let audioList = new Set(); // Use Set to filter duplicates
  let testURL = "https://globallit-aws-s3-static-webapp-test-us-east-2.s3.us-west-2.amazonaws.com/feed-the-monster";
  // let testURL = "http://127.0.0.1:5500";
  audioList.add(`/lang/${language}/ftm_${language}.json`);
  fetch(`./lang/${language}/ftm_${language}.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) =>
    res.json().then(async (data) => {
      await cacheFeedBackAudio(data.FeedbackAudios, language);

      for (const level of data.Levels) {
        for (const puzzle of level.Puzzles) {
          let file = puzzle.prompt.PromptAudio;

          audioList.add(
            self.location.href.includes("https://feedthemonsterdev.curiouscontent.org")
              ? file.slice(0, file.indexOf("/feedthemonster") + "/feedthemonster".length) +
              "dev" + file.slice(file.indexOf("/feedthemonster") + "/feedthemonster".length)
              : self.location.href.includes(testURL)
                ? file.replace("https://feedthemonster.curiouscontent.org", testURL)
                : file
          );
        }
      }
      if (self.location.href.includes(testURL)) {
        audioList.add(`${testURL}/lang/${language}/ftm_${language}.json`);
      }
      cacheAudiosFiles(Array.from(audioList), language); // Convert Set back to array
    })
  );
}

async function cacheAudiosFiles(audioList, language) {
  const uniqueAudioURLs = [...new Set(audioList)]; // Ensuring the audioList has only unique values
  const percentageInterval = 10;
  const partSize = Math.ceil(uniqueAudioURLs.length / percentageInterval);
  const delayBetweenRequests = 800;
  const timeoutMultiplier = 0.6; // Adjust multiplier based on device performance
  const timeoutValue = 3000; // Adjust timeout value as needed (in milliseconds)

  for (let i = 0; i < percentageInterval; i++) {
    const startIndex = i * partSize;
    let endIndex = startIndex + partSize;
    if (i == percentageInterval - 1) {
      endIndex = uniqueAudioURLs.length;
    }
    const part = uniqueAudioURLs.slice(startIndex, endIndex);

    try {
      const cache = await caches.open(language);
      const timeoutPromises = part.map(async (url) => {
        try {
          const timeoutPromise = new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
              clearTimeout(timeoutId);
              reject(new Error("Timeout while caching audio: " + url));
            }, timeoutValue * timeoutMultiplier);
          });
          console.log('Cached Audio files:', url);
          return Promise.race([timeoutPromise, cache.add(url)]);
        } catch (error) {
          console.error('Error caching audio:', url, error);
        }
      });

      await Promise.all(timeoutPromises);
    } catch (error) {
      console.error('Could not add audios:', error);
    } finally {
      await channel.postMessage({
        msg: "Loading",
        data: Math.min((i + 1) * percentageInterval, 100),
      });
    }

    await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
  }
}


async function cacheCommonAssets(language) {
  const assetUrls = [
    `./lang/${language}/audios/fantastic.WAV`,
    `./lang/${language}/audios/great.wav`,
    `./lang/${language}/images/fantastic_01.png`,
    `./lang/${language}/images/great_01.png`,
    `./lang/${language}/images/title.png`,
  ];

  const timeoutMultiplier = 1; // Adjust multiplier based on device performance
  const timeoutValue = 4000; // Adjust timeout value as needed (in milliseconds)

  try {
    const cacheName = language;
    const cache = await caches.open(cacheName);

    const timeoutPromises = assetUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error("Timeout while caching audio: " + url));
        }, timeoutValue * timeoutMultiplier);
        console.log('Cached Asset:', url);
        cache.add(url)
          .then(() => {
            clearTimeout(timeoutId);
            resolve();
          })
          .catch((error) => {
            clearTimeout(timeoutId);
            reject(error);
          });
      });
    });

    await Promise.all(timeoutPromises);
  } catch (e) {
    console.log('Could not open cache:', e);
  }
}

async function cacheFeedBackAudio(feedBackAudios, language) {
  let testURL = "globallit-aws-s3-static-webapp-test-us-east-2.s3.us-west-2.amazonaws.com";
  // let testURL = "127.0.0.1:5500"
  const audioUrls = [...new Set(feedBackAudios.map(audio => {
    if (self.location.href.includes("feedthemonsterdev")) {
      return audio.replace("/feedthemonster", "/feedthemonsterdev");
    } else if (self.location.href.includes(testURL)) {
      return audio.replace("https://feedthemonster.curiouscontent.org", "https://globallit-aws-s3-static-webapp-test-us-east-2.s3.us-west-2.amazonaws.com/feed-the-monster");
      // return audio.replace("https://feedthemonster.curiouscontent.org", "http://127.0.0.1:5500"); 
    } else {
      return audio;
    }
  }))];

  const timeoutMultiplier = 0.6; // Adjust multiplier based on device performance
  const timeoutValue = 3000; // Adjust timeout value as needed (in milliseconds)

  try {
    const cacheName = language;
    const cache = await caches.open(cacheName);

    await Promise.all(audioUrls.map(async (url) => {
      try {
        const timeoutPromise = new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            clearTimeout(timeoutId);
            reject(new Error("Timeout while caching audio: " + url));
          }, timeoutValue * timeoutMultiplier);
        });

        await Promise.race([timeoutPromise, cache.add(url)]);
        console.log('Cached Feedback audio:', url);
      } catch (e) {
        console.log('Error caching audio:', url, e);
      }
    }));
  } catch (e) {
    console.log('Could not open cache:', e);
  }
}


self.addEventListener("fetch", function (event) {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.searchParams.has('cache-bust')) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }

      return fetch(event.request).catch(function () {
        // If the fetch fails (like when offline), return a fallback response
        return new Response('Network unavailable in sw', { status: 503 });
      });;
    })
  );
});

