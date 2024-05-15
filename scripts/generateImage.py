from PIL import Image, ImageDraw, ImageFont
import os
import textwrap

# Load the background image
background = Image.open('background.jpg')

draw = ImageDraw.Draw(background)

font = ImageFont.truetype('Proxima-Nova-Soft-Bold.ttf', 49)

text = 'Hello World Hello World Hello World'
lines = textwrap.wrap(text, width=40)

y = (background.height - (len(lines) * font.getbbox(text)[1])) / 2 - 50
x = 30

for line in lines:
    draw.text((x, y), line, fill=(237, 230, 211), font=font)
    y += font.getbbox(line)[1]

background.save('output.jpg')

# TODO: Fix wrapping issue
# TODO: Space out the lines
# TODO: Automatic text generation from markdown title
