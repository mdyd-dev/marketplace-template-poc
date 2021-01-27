set -eu

cd seed

ruby convert.rb

cd images
zip -r ../images.zip sample_item_photo/ sample_profile_photo
cd -

zip data models.csv users.csv
cp categories-i18n.en.txt ../app/translations/en_categories.yml

cd ..

pos-cli data clean --auto-confirm --include-schema
pos-cli deploy
pos-cli data import --path=./seed/data.zip --zip
pos-cli uploads push --path=seed/images.zip
