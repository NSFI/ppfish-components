#!/bin/bash

# testing before publish
npm run lint && npm run site:build && npm run test
