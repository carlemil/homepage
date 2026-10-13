# Refreshes the last-commit date and Active/Inactive status of the private-repo projects,
# which the cloud routine cannot read. Reads the local clones; active = commit within 14 days.
# Run from anywhere: powershell -File scripts\update-activity.ps1
# If a project flips status, move its card so active cards stay first.
$root = Split-Path $PSScriptRoot -Parent
$repos = @{
  'elev8'       = 'D:\source\elev8'
  'talebindery' = 'D:\source\MyStoryGenerator'
}
$cutoff = (Get-Date).AddDays(-14).Date

foreach ($name in $repos.Keys) {
  $date = (git -C $repos[$name] log -1 --format=%cs --branches --remotes).Trim()
  $active = [datetime]::Parse($date) -ge $cutoff
  $cls = if ($active) { 'active' } else { 'inactive' }
  $label = if ($active) { 'Active' } else { 'Inactive' }
  $span = "<span class=`"status $cls`">$label<time datetime=`"$date`" title=`"Last commit`">$date</time></span>"
  $pattern = '<span class="status (?:in)?active">[^<]*<time[^>]*>[^<]*</time></span>'

  # project page: the whole page has one status span
  $page = Join-Path $root "projects\$name.html"
  $text = [IO.File]::ReadAllText($page)
  [IO.File]::WriteAllText($page, [regex]::Replace($text, $pattern, $span))

  # index: the status span inside the card linking to projects/<name>.html
  $index = Join-Path $root 'index.html'
  $text = [IO.File]::ReadAllText($index)
  $card = "(?s)(href=`"projects/$name\.html`".*?)$pattern"
  [IO.File]::WriteAllText($index, [regex]::Replace($text, $card, { param($m) $m.Groups[1].Value + $span }, 'None'))

  "$name -> $label $date"
}
