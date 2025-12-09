// =========================
//  STATSTOX FEED LOGIC
// =========================

async function stxLoadFeed() {
  const feedList = document.getElementById("feed-list");
  if (!feedList) return; // not on feed page

  try {
    const data = await stxFetch("/api/feed");

    if (!data || !data.length) {
      feedList.innerHTML = "<p>No markets open yet.</p>";
      return;
    }

    const html = data.map(function (item) {
      return (
        '<div class="feed-card">' +
          '<div class="feed-player">' + item.player + "</div>" +
          '<div class="feed-price">$' + item.price + "</div>" +
          '<div class="feed-change">' + item.change + "</div>" +
        "</div>"
      );
    }).join("");

    feedList.innerHTML = html;
  } catch (err) {
    console.error(err);
    feedList.innerHTML = "<p class='error'>" + err.message + "</p>";
  }
}