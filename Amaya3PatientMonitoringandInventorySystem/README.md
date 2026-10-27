# Amaya 3 — Portfolio Screenshots

**Project:** Amaya 3 Patient Monitoring and Inventory System (Barangay Health Center)
**Stack:** Laravel 8 REST API · Vue 2 SPA · Vuetify 2 · MySQL · custom bearer-token auth
**Captured:** October 25, 2026 — 1440×900 desktop, 390×844 mobile
**Roles shown:** BHW / Admin (staff) at Resident (pasyente)

> Ang bawat larawan ay may **numbered badge** (maliit na teal circle). Ang numero sa
> larawan ang tumutugma sa numero sa table sa ibaba — kaya malinaw kung aling button
> ang ginagawa ang ano.
>
> **Blurred:** naka-blur ang lahat ng profile picture ng pasyente (`storage/patients`).

---

## Index

| # | File | Screen | Role |
|---|------|--------|------|
| 01 | `01-login.png` | Login | public |
| 02 | `02-forgot-password.png` | Forgot password | public |
| 03 | `03-dashboard.png` | Dashboard (full page) | BHW |
| 04 | `04-patient-check-up.png` | Patient check-up list | BHW |
| 05 | `05-dialog-new-checkup.png` | Dialog: New Check-up | BHW |
| 06 | `06-patient-records.png` | Patient records & history | BHW |
| 07 | `07-dialog-patient-profile.png` | Dialog: Patient profile | BHW |
| 08 | `08-immunization.png` | EPI immunization records | BHW |
| 09 | `09-dialog-add-immunization.png` | Dialog: Add immunization | BHW |
| 10 | `10-maternity.png` | Pregnant women tracking | BHW |
| 11 | `11-dialog-add-maternity.png` | Dialog: Add maternity record | BHW |
| 12 | `12-inventory-bhw.png` | Inventory (admin view) | BHW |
| 13 | `13-dialog-add-item.png` | Dialog: Add inventory item | BHW |
| 14 | `14-dialog-stock-action.png` | Dialog: Stock adjustment | BHW |
| 15 | `15-supply-requests.png` | Supply requests (expanded) | BHW |
| 16 | `16-dialog-request-review.png` | Dialog: Review & approve | BHW |
| 17 | `17-user-management.png` | User management | BHW |
| 18 | `18-dialog-create-user.png` | Dialog: Create user account | BHW |
| 19 | `19-dialog-create-account-for-patient.png` | Dialog: Create account for patient | BHW |
| 20 | `20-resident-dashboard.png` | Dashboard | Resident |
| 21 | `21-resident-inventory.png` | Inventory (resident view) | Resident |
| 22 | `22-dialog-multi-item-request.png` | Dialog: Multi-item request | Resident |
| 23 | `23-my-request.png` | My supply requests | Resident |
| 24 | `24-dialog-my-request-detail.png` | Dialog: My request detail | Resident |
| 25 | `25-mobile-dashboard.png` | Mobile layout | Resident |

---

## 01 — Login
`01-login.png` · public

**Para saan:** Pasukan ng lahat ng user. Isang form lang, walang role selector —
ang role ay galing sa server response.

| # | Element | Ano ang ginagawa |
|---|---------|------------------|
| 1 | Username | Ang `Usernames` column sa `users_tbl` (hindi email) |
| 2 | Password (+ 👁 toggle) | Naka-bcrypt sa DB; ang eye icon ay show/hide lang |
| 3 | Remember me | Kung naka-check, **walang expiry** ang token (`ExpiresAt = null`). Kung hindi, 7 araw |
| 4 | Login | `POST /api/login` → 60-char random token → naka-save sa `localStorage` |

**Caption:** *Token-based authentication against a custom PHP backend.*

**Note:** walang "Forgot password?" link sa page na ito — ang `/forgot-password`
ay naaabot lang sa direktang URL. Ito ang isa sa mga alam nang mismatch.

---

## 02 — Forgot password
`02-forgot-password.png` · public

**Para saan:** Password recovery sa pamamagitan ng verification code sa
registered contact number — hindi nagbabalik ng bagong password sa response.

| # | Element | Ano ang ginagawa |
|---|---------|------------------|
| 1 | Username | Hinahanap ang account; ang code ay ipapadala sa numero na nakatala |
| 2 | Send Code | Gumagawa ng **6-digit hashed code** at ipinapadala via `SmsService` |
| 3 | Back to Login | Bumalik sa login |

**⚠️ Bug na nakita:** sabi ng info box *"username at full name"*, pero **isang
field lang** ang meron. Dapat i-update ang text o idagdag ang full name field.

---

## 03 — Dashboard (BHW)
`03-dashboard.png` · BHW · full page

**Para saan:** Isang tingin lang sa kalagayan ng health center — population,
immunization coverage, consultations, at stock. Lahat galing sa live API.

| # | Element | Ano ang ginagawa |
|---|---------|------------------|
| 1 | 4 stat cards | Total patients, immunizations given, consultations this month, pending follow-ups (may trend vs last month) |
| 2 | Patient Demographics by Age Group | Bar chart ng patient count per age bracket |
| 3 | Immunization Coverage by Vaccine | Donut chart ng coverage per vaccine (Hep B, Penta, BCG…) |
| 4 | Monthly Patient Consultations | Line chart ng consultations per buwan |
| 5 | Inventory Stock Status | Current stock vs low-stock threshold per item — dito mo makikita agad ang malapit nang maubos |
| 6 | Recent Activity | Timeline ng latest system events (bagong patient, immunization, atbp.) |

**Caption:** *Live health-center dashboard — demographics, immunization coverage,
consultation trends, at stock levels.*

---

## 04 — Patient check-up (list)
`04-patient-check-up.png` · BHW

**Para saan:** Log ng bawat konsultasyon. Dito nagsisimula ang lahat ng patient
record — check-up, diagnosis, reseta, at follow-up.

| # | Element | Ano ang ginagawa |
|---|---------|------------------|
| 1 | New Check-up | Bubukas ang check-up form (tingnan ang 05) |
| 2 | Search by name | Live filter habang nagta-type |
| 3 | Stat cards | Total check-ups, male/female count, pending follow-ups |
| 4 | ✏️ pencil (per row) | I-edit ang check-up record |
| 5 | 🗑 trash (per row) | I-delete (may browser confirm bago tuluyan) |

**Caption:** *Consultation log with follow-up tracking and per-record actions.*

---

## 05 — Dialog: New Check-up
`05-dialog-new-checkup.png` · BHW

**Para saan:** Isang form para sa check-up **at** reseta — kapag may niresetang
gamot, awtomatikong bumababa ang stock at may ledger entry.

| # | Element | Ano ang ginagawa |
|---|---------|------------------|
| 1 | Patient Information | Pumili ng existing patient o gumawa ng bago |
| 2 | Existing / New toggle | `Existing Patient` = autocomplete mula sa `patient_tbl`; `New Patient` = bagong record |
| 3 | Add Medicine | Nagdadagdag ng row sa prescription table (gamot, dosage, tagal) |
| 4 | Save Check-up | Sine-save ang check-up + findings + prescription, at nagbabawas ng stock |

**Fields na hindi naka-number:** Height, Weight, Blood Pressure, Check-up Date,
Follow-up Check, Diagnosis, Remarks.

---

## 06 — Patient records & history
`06-patient-records.png` · BHW

**Para saan:** Per-patient na "folder" view — hindi listahan ng events, kundi
kabuuan ng kasaysayan ng isang pasyente.

| # | Element | Ano ang ginagawa |
|---|---------|------------------|
| 1 | New Consultation | Mabilisang daan papunta sa check-up form |
| 2 | Stat cards | Total patients, check-ups, prescriptions, pending follow-ups |
| 3 | Patient folder card | I-click ang card → bubukas ang profile (tingnan ang 07). Nakalagay na agad ang bilang ng check-ups, prescriptions, at kung due na ang follow-up |
| 4 | Search by name | Filter ng cards |

**Blurred:** ang mga profile picture sa cards ay naka-blur.

---

## 07 — Dialog: Patient profile
`07-dialog-patient-profile.png` · BHW

**Para saan:** Buong clinical picture ng isang pasyente sa isang dialog.

**Sections:**
- **Personal Information** — pangalan, edad, kasarian, contact, street, barangay
- **Profile Picture** — `Upload` button (BHW/Admin lang ang pwede; nakablur sa screenshot)
- **Check-up History** — timeline ng bawat check-up: height/weight, BP, diagnosis,
  at ang niresetang gamot. Nakalagay rin kung may follow-up o wala.

**Buttons:** `Upload` (palitan ang picture) · `Close` (isara).

---

## 08 — EPI immunization records
`08-immunization.png` · BHW

**Para saan:** Childhood immunization register (EPI). Sinusubaybayan ang bawat
bakuna per bata, kasama ang facility kung saan ito ginawa.

| # | Element | Ano ang ginagawa |
|---|---------|------------------|
| 1 | Export to Excel | Nagge-generate ng `.xlsx` via PhpSpreadsheet — kaya kailangan ng PHP 8.3+ |
| 2 | Add New Record | Bubukas ang immunization form (tingnan ang 09) |
| 3 | Vaccine Type filter | I-filter per bakuna (BCG, Hep B, Penta 1/2/3…) |
| 4 | ✏️ pencil (per row) | I-edit ang record |

**Note:** may **Transferred** filter at **Facility** chips (Amaya 3 / Government /
Private / Other LGU) para makita kung sa labas ginawa ang bakuna.

---

## 09 — Dialog: Add immunization record
`09-dialog-add-immunization.png` · BHW

**Para saan:** Isang bakuna = isang record. Kinukuha ang bata, guardian, lokasyon,
at detalye ng bakuna.

**Fields:** First Name, Last Name, Gender, Birthdate, Guardian Name, Contact,
House No., Street, Barangay, Vaccine Type(s), Date Vaccinated, Facility,
Transferred Status.

**Buttons:** `Save Record` (magdagdag) · `Cancel`.

---

## 10 — Pregnant women tracking
`10-maternity.png` · BHW

**Para saan:** Prenatal monitoring — trimester, weeks of gestation, due date, at
TT (tetanus) doses.

| # | Element | Ano ang ginagawa |
|---|---------|------------------|
| 1 | Add New Record | Bubukas ang maternity form (tingnan ang 11) |
| 2 | Total Pregnant card | Bilang ng buntis, at breakdown per trimester |
| 3 | ✏️ pencil (per row) | I-edit ang prenatal record |

**Auto-computed sa table:** Weeks, Due Date, Trimester (base sa LMP date).

---

## 11 — Dialog: Add maternity record
`11-dialog-add-maternity.png` · BHW

**Para saan:** Prenatal record entry. Kapag inilagay ang LMP date, awtomatikong
kinukuwenta ang weeks at due date.

**Fields:** pangalan, edad, contact, street, LMP date, TT doses (may `Add TT Dose`
button para sa bawat dose), status, remarks.

**Buttons:** `Save Record` · `Cancel`.

---

## 12 — Inventory (BHW view)
`12-inventory-bhw.png` · BHW

**Para saan:** Stock ledger ng gamot at supplies, may expiry at status.

| # | Element | Ano ang ginagawa |
|---|---------|------------------|
| 1 | Add New Item | Bubukas ang item form (tingnan ang 13) |
| 2 | Search + Category + Status filters | Hanapin per pangalan, kategorya (Medicines/Supplies), o status |
| 3 | ✏️ pencil | I-edit ang item details (pangalan, dosage, threshold, expiry, supplier) |
| 4 | 📦 archive-edit | **Stock adjustment** — magdagdag o magbawas ng stock (tingnan ang 14) |
| 5 | 🗑 delete | I-delete ang item (may confirm) |

**Status badges:** `In Stock` (green) · `Low Stock` (amber) · `Out of Stock` /
`Expired` (red). Awtomatiko itong naka-derive sa stock + expiry, hindi manual.

---

## 13 — Dialog: Add inventory item
`13-dialog-add-item.png` · BHW

**Para saan:** Bagong gamot o supply sa catalog.

**Fields:** Item Name, Category, Generic Name, Dosage, Stock Quantity, Unit,
Low Stock Threshold (default 10), Expiry Date, Supplier, Description.

**Buttons:** `Save Item` · `Cancel`.

**Note:** sinasabi ng info box na awtomatikong nade-determine ang status —
`Expired` kapag lumampas na ang expiry date.

---

## 14 — Dialog: Stock adjustment
`14-dialog-stock-action.png` · BHW

**Para saan:** Ang tanging paraan para baguhin ang stock nang hindi nag-e-edit ng
item — at bawat galaw dito ay may audit trail.

**Fields:**
- **Action** — `Add Stock` / `Deduct Stock` / `Set Stock`
- **Unit + Quantity** — may live conversion preview (*"Adding: 1 pcs = 1 pcs"*)
- **Supplier** — para kanino galing (kapag add)
- **Expiry Date** — bagong batch
- **Reason** — **required** para may dahilan sa ledger

**Buttons:** `+ Add` · `Cancel`.

**Note:** bawat save ay gumagawa ng row sa `inventory_movements_tbl` via Eloquent
observer — kasama ang user, reason, at timestamp.

---

## 15 — Supply requests (BHW, expanded)
`15-supply-requests.png` · BHW

**Para saan:** Dito nagre-review ang BHW ng mga hiling ng residente. Naka-expand
ang isang request para makita agad ang mga item.

| # | Element | Ano ang ginagawa |
|---|---------|------------------|
| 1 | Review & Approve | Bubukas ang detalye + Approve/Reject (tingnan ang 16) |

**Nakikita sa expanded row:**
- Request number, bilang ng item, at pangalan ng humiling
- Table ng **Item / Requested / Available** — pula ang available kapag kulang sa hinihingi
- Status chip: `pending` / `approved` / `rejected`
- `1 pending` badge sa section title

**Ito ang multi-item na request:** isang request record, tatlong item
(Biogesic 2 pc, Bandage 3 pc, Cotton Balls 1 box = 50 pcs).

---

## 16 — Dialog: Review & approve
`16-dialog-request-review.png` · BHW

**Para saan:** Final review bago bawasin ang stock. Dito nakikita ang lahat ng
kailangan para makapagdesisyon.

| # | Element | Ano ang ginagawa |
|---|---------|------------------|
| 1 | I-approve | Tinatanggap ang request → **bumababa ang stock** → notification sa requester |
| 2 | I-reject | Bubukas ng maliit na dialog para sa dahilan → notification sa requester |

**Nakikita rin:** pangalan at username ng humiling, petsa, table ng mga hiniling
(Hiniling / Available), at **Resepta** section.

**Buttons:** `Kanselahin` (isara, walang aksyon).

---

## 17 — User management
`17-user-management.png` · BHW (admin only)

**Para saan:** Account administration. Dalawang tab: existing users at mga
pasyenteng wala pang account.

| # | Element | Ano ang ginagawa |
|---|---------|------------------|
| 1 | Create User Account | Manual na paggawa ng account (tingnan ang 18) |
| 2 | Patients Without Account tab | Listahan ng pasyente na may record pero walang login — pwede gawan ng account (tingnan ang 19) |
| 3 | 🔑 lock-reset | I-reset ang password → ang user ay kailangang magpalit sa susunod na login |
| 4 | 🗑 delete | I-delete ang account (may confirm) |

**Status column:** `Active` (green) o `Needs Password Change` (amber).

---

## 18 — Dialog: Create user account
`18-dialog-create-user.png` · BHW

**Para saan:** Gumawa ng staff o resident account nang manu-mano.

**Fields:** Full Name, Username, Phone Number, Temporary Password, at role
checkbox (Amaya 3 Resident / Barangay Health Worker).

**Buttons:** `Create Account` · `Cancel`.

**Note:** pagkatapos gawin, `MustChangePassword = 1` — pipilitin ng router na
magpalit ng password ang user sa unang login.

---

## 19 — Dialog: Create account for patient
`19-dialog-create-account-for-patient.png` · BHW

**Para saan:** Auto-generate ng account para sa isang pasyenteng may record pero
walang login — hindi mo kailangang mag-type ng detalye.

**Nakikita:** pangalan ng pasyente at ang mga account na gagawin
(auto username + temporary password).

**Buttons:** `Create Account` · `Cancel`.

---

## 20 — Dashboard (Resident)
`20-resident-dashboard.png` · Resident

**Para saan:** Pareho ang dashboard sa BHW, pero **limitado ang navigation** —
wala ang check-up, immunization, maternity, at user management.

| # | Element | Ano ang ginagawa |
|---|---------|------------------|
| 1 | Stat cards | Public-level health center stats |
| 2 | 🔔 Notification bell | Mga update sa sariling requests (tingnan ang 16 — kapag na-approve, may notification) |

**Role gate:** ang `requiresBHW: true` sa `router.js` ang humaharang sa admin
pages — hindi lang nakatago ang menu, talagang nire-redirect pabalik sa `/`.

---

## 21 — Inventory (Resident view)
`21-resident-inventory.png` · Resident

**Para saan:** Nakikita ng residente kung may stock, pero **walang Actions
column** — read-only ito para sa kanila.

| # | Element | Ano ang ginagawa |
|---|---------|------------------|
| 1 | Request Medicine / Supply | Ang tanging CTA — bubukas ang multi-item form (tingnan ang 22) |
| 2 | Search + filters | Hanapin ang gamot/supply |

**Pagkakaiba sa BHW view:** walang `Add New Item`, walang edit/stock/delete
icons. Isang malaking button lang ang nasa kanan.

---

## 22 — Dialog: Multi-item request
`22-dialog-multi-item-request.png` · Resident

**Para saan:** **Isang request** para sa maraming item — hindi isa-isa. Ito ang
bagong feature at ang pinakamagandang demo sa portfolio.

| # | Element | Ano ang ginagawa |
|---|---------|------------------|
| 1 | Gamot / Supply picker | Autocomplete sa mga requestable item; may `Clear` icon |
| 2 | Qty | Bilang na hinihingi (may unit dropdown sa tabi) |

**Paano ito gumagana:**
- `+ Add` → idinadagdag sa listahan sa ibaba (**max 20 items**)
- May duplicate prevention — hindi ka makakapagdagdag ng parehong item nang dalawang beses
- Nakikita agad ang **Available ngayon** at kung **Kailangan ng resepta**
- Kung may item na nangangailangan ng reseta, isang **receipt upload** lang para sa buong request
- `Ipakalada` → isang `POST /api/supply-requests` na may `items[0..n]`

**Resulta sa DB:** **isang** row sa `supply_requests_tbl` + maraming row sa
`supply_request_items_tbl` (hindi isang request per item).

---

## 23 — My supply requests (Resident)
`23-my-request.png` · Resident

**Para saan:** Sariling requests lang ang nakikita ng residente, may status.

| # | Element | Ano ang ginagawa |
|---|---------|------------------|
| 1 | View Details | Bubukas ang detalye ng request (tingnan ang 24) |

**Note:** sa resident view, ang pangalawang linya ay **petsa** — hindi pangalan ng
requester (sa BHW view, pangalan ng humiling ang nakalagay).

---

## 24 — Dialog: My request detail
`24-dialog-my-request-detail.png` · Resident

**Para saan:** Kaparehong dialog sa 16, **pero walang Approve/Reject** — hindi
pwedeng aprubahan ng requester ang sariling request.

**Nakikita:** request number, status chip, petsa, table ng mga hiniling, at
**Resepta** section (kung kailangan).

**Button:** `Kanselahin` lang (isara).

**Ito ang magandang ipakita sa portfolio:** isang shared component, dalawang
magkaibang UI depende sa role.

---

## 25 — Mobile dashboard
`25-mobile-dashboard.png` · 390×844

**Para saan:** Patunay na responsive — naging single-column ang cards, at naging
hamburger menu ang sidebar. Ginagamit ito ng mga BHW sa field.

---

## Role matrix (mabilisang tingin)

| Feature | Resident | BHW / Admin |
|---|:--:|:--:|
| Dashboard | ✅ | ✅ |
| Inventory — tingnan | ✅ | ✅ |
| Inventory — mag-request | ✅ | ❌ (BHW ang nag-a-approve) |
| Inventory — add/edit/stock/delete | ❌ | ✅ |
| Patient check-up | ❌ | ✅ |
| Patient records & history | ❌ | ✅ |
| Immunization | ❌ | ✅ |
| Maternity | ❌ | ✅ |
| Approve / Reject request | ❌ | ✅ |
| User management | ❌ | ✅ |

---

## Bago i-publish

1. **Pangalan at numero.** Naka-blur ang mga larawan ng pasyente, pero **nakikita
   pa rin** ang mga pangalan sa 04, 06, 07, 10, 15, 23 at ang mga pangalan +
   cellphone ng staff sa **17 at 18** (`Danica Marie Arciaga`, `Ronald Gallego Jr.`,
   `09467615958`…). Kung public ang portfolio, i-blur din ang mga ito o sabihin mo
   sa akin at gagawa ako ng anonymized set.
2. **`test` na pasyente.** May lumalabas na "test added to system" sa Recent
   Activity ng 03. Kung ayaw mong makita, i-delete ang patient na `test` (id 8)
   tapos i-retake ang 03.
3. **Retina.** Kung high-DPI ang portfolio theme, i-retake sa
   `deviceScaleFactor: 2`.
4. **RA 10173.** Huwag i-upload ang totoong patient data sa public site.

---

## Paano i-retake

```bash
php artisan serve            # kailangan tumatakbo sa :8000
```

Demo accounts na ginamit (ginawa para sa screenshots lang):

| Username | Password | Role |
|---|---|---|
| `demo.bhw` | `Demo2026!` | BHW / Admin |
| `demo.resident` | `Demo2026!` | Resident |

Burahin kapag tapos:

```sql
DELETE FROM user_tokens_tbl WHERE UserID IN (39, 40);
DELETE FROM notifications_tbl WHERE UserID IN (39, 40);
DELETE FROM users_tbl WHERE Username IN ('demo.bhw', 'demo.resident');
```
