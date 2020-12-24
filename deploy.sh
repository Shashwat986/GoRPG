#!/bin/bash
if git diff-index --quiet HEAD --; then
    branch=$(git symbolic-ref --short -q HEAD)
    if [ branch = 'master' ]; then
        # No changes
        git checkout gh-pages
        git reset --hard master
        pnpm run compile
        git add --force index.html
        git add --force public/*
        git commit -m "Deploy"
        git push origin gh-pages
        git checkout master
    else
        echo "Not on Master. Please go to master"
    fi
else
    # Changes
    echo "Something has changed. Please stash or commit to deploy"
fi
