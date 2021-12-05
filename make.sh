#!/bin/bash

ebook-convert index.html cs61a.epub \
    --cover=cover.jpg \
    --title='CS61A: SICP in Python' \
    --authors='Berkeley' \
    --publisher='Berkeley' \
	--breadth-first \
    --use-auto-toc \
    --level1-toc="//*[name()='h1']" \
    --level2-toc="//*[name()='h2']" \
    --level3-toc="//*[name()='h3']" \
    --language=en \
    --pubdate=2019 -v
