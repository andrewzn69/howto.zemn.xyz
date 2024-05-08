---
description: 
layout: ../../layouts/BlogPost.astro
title: How to combine videos with FFmpeg
createdAt: 13/11/2023
updatedAt: 13/11/2023
tags:
- ffmpeg
- cli
heroImage: /posts/
slug:  ffmpeg-combine-videos
---

1. Create a text file with the list of videos you want to combine. For example, create a file named `videos.txt` with the following content:

```bash
file 'video1.mp4'
file 'video2.mp4'
```

2. Run the following FFmpeg command to combine the videos:

```bash
ffmpeg -f concat -safe 0 -i videos.txt -c:v copy -c:a copy output.mp4
```

Now you have a new video file named `output.mp4` that contains the combined videos.
