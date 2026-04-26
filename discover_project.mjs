// discover_project.mjs — Fetch custom fields directly from project
// Run: $env:ASANA_PAT="your_token"; node discover_project.mjs

const PAT = process.env.ASANA_PAT;
if (!PAT) { console.error("Set ASANA_PAT env var"); process.exit(1); }

const headers = { "Authorization": `Bearer ${PAT}`, "Accept": "application/json" };
const api = async (path) => {
  const res = await fetch(`https://app.asana.com/api/1.0${path}`, { headers });
  const data = await res.json();
  if (data.errors) { console.error(`ERROR on ${path}:`, data.errors); return null; }
  return data.data;
};

const STANDUP_PROJECT = "1204969864314028";
const CALENDAR_PROJECT = "1207246447954463";

(async () => {
  console.log("=".repeat(60));
  console.log("InAFlow — Project-Level Custom Field Discovery");
  console.log("=".repeat(60));

  // 1. Get all custom fields from Pod 3 Stand Up project
  console.log("\n=== POD 3 STAND UP — Custom Fields ===");
  const standupFields = await api(`/projects/${STANDUP_PROJECT}/custom_field_settings?opt_fields=custom_field.name,custom_field.gid,custom_field.type,custom_field.enum_options,custom_field.enum_options.name,custom_field.enum_options.gid,custom_field.enum_options.enabled`);
  
  if (standupFields) {
    for (const setting of standupFields) {
      const f = setting.custom_field;
      console.log(`\n  Field: "${f.name}" | GID: ${f.gid} | Type: ${f.type}`);
      if (f.enum_options) {
        for (const o of f.enum_options) {
          console.log(`    ${o.gid} | "${o.name}" | enabled: ${o.enabled}`);
        }
      }
    }
  }

  // 2. Get all custom fields from Pod 3 Calendar project
  console.log("\n\n=== POD 3 CALENDAR — Custom Fields ===");
  const calFields = await api(`/projects/${CALENDAR_PROJECT}/custom_field_settings?opt_fields=custom_field.name,custom_field.gid,custom_field.type,custom_field.enum_options,custom_field.enum_options.name,custom_field.enum_options.gid,custom_field.enum_options.enabled`);
  
  if (calFields) {
    for (const setting of calFields) {
      const f = setting.custom_field;
      console.log(`\n  Field: "${f.name}" | GID: ${f.gid} | Type: ${f.type}`);
      if (f.enum_options) {
        for (const o of f.enum_options) {
          console.log(`    ${o.gid} | "${o.name}" | enabled: ${o.enabled}`);
        }
      }
    }
  }

  // 3. Print current CONFIG for comparison
  console.log("\n\n" + "=".repeat(60));
  console.log("CURRENT CONFIG — Compare with above");
  console.log("=".repeat(60));
  console.log(`
  Effort Level Field: 1206065778986020
    Low effort:       1206065778986021 → 1 pt
    Medium effort:    1206065778986022 → 3 pts
    High effort:      1206065778986023 → 5 pts
    Need to scope:    1206065778986024 → 0 pts
    Very High:        ??? → 8 pts  ← NEED THIS

  Status Field: 1206065778986026
    Acknowledged:                    1207515172179334 → Working
    In Progress:                     1207515172179335 → Working
    Ongoing:                         1206065778986028 → Working
    Support:                         1206958866164775 → Working
    Any Updates?:                    1207064686450636 → Working
    Need More Info:                  1206065778986029 → Working
    Discuss:                         1207532336387944 → Working
    In QA:                           1207064686450642 → Working
    On Deck:                         1207515172179347 → Blocked
    Pending Details from Client:     1208158822083804 → Blocked
    On Hold:                         1206301625857858 → Blocked
    Awaiting response from another BU: 1213814052615258 → Blocked
    Ready for Review:                1206065778986030 → Review
    Complete:                        1206337349568851 → Done

  Calendar Color Field: 1202123315418041
  `);

  console.log("=== DONE — Paste everything above back to Claude ===");
})();
