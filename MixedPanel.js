// Start Mixpanel tracking
try {
  if (!localStorage.mixpanelId) {
    // First time to connect with the current browser
    localStorage.mixpanelId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    mixpanel.identify(localStorage.mixpanelId);
    mixpanel.people.set({
      $created: new Date(),
      $last_login: new Date(),
      mixpanelId: localStorage.mixpanelId
    });
  } else {
    mixpanel.identify(localStorage.mixpanelId);
    mixpanel.people.set({
      $last_login: new Date()
    });
  }
} catch (e) {
  console.log("CATCH", e);
}
mixpanel.time_event("Event"); // Start a chronometer for "Event"

function mixpanelStopAndStart() {
  mixpanel.track("Event"); // Track "Event"
  mixpanel.time_event("Event"); // Start a new chronometer for "Event"
}

document.addEventListener("click", mixpanelStopAndStart);
document.addEventListener("keydown", mixpanelStopAndStart);
// End Mixpanel tracking
