commit() {
  local name="$1" email="$2" date="$3" msg="$4"
  GIT_AUTHOR_NAME="$name" GIT_AUTHOR_EMAIL="$email" GIT_AUTHOR_DATE="$date" \
  GIT_COMMITTER_NAME="$name" GIT_COMMITTER_EMAIL="$email" GIT_COMMITTER_DATE="$date" \
  git commit -q -m "$msg"
}
merge_ff() {
  local name="$1" email="$2" date="$3" msg="$4" branch="$5"
  GIT_AUTHOR_NAME="$name" GIT_AUTHOR_EMAIL="$email" GIT_AUTHOR_DATE="$date" \
  GIT_COMMITTER_NAME="$name" GIT_COMMITTER_EMAIL="$email" GIT_COMMITTER_DATE="$date" \
  git merge --no-ff -q -m "$msg" "$branch"
}
tagit() {
  local name="$1" email="$2" date="$3" tag="$4" msg="$5"
  GIT_COMMITTER_NAME="$name" GIT_COMMITTER_EMAIL="$email" GIT_COMMITTER_DATE="$date" \
  git tag -a "$tag" -m "$msg"
}
ARJU_N="Arju"; ARJU_E="arju@quickbite.dev"
RIYA_N="Riya Sharma"; RIYA_E="riya.sharma@quickbite.dev"
