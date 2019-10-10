#!/bin/bash
TEMPLATE=machines/Template.js

if [[ -z "$1" ]]
then
    echo "copy_template.sh <MachineName>"
fi

cat $TEMPLATE | sed "s/Template/$1/g" > machines/$1.js
