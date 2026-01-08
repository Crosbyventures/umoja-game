:root{
  --bg:#070a12;
  --card:#0c1222;
  --card2:#0b1020;
  --text:#e9edf7;
  --muted:#aab3c7;
  --line:#1a2440;
  --accent:#f3c24a;
  --btn:#121a33;
}

*{box-sizing:border-box}
body{
  margin:0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
  background: radial-gradient(1200px 600px at 50% -10%, #17224a, transparent 60%), var(--bg);
  color:var(--text);
}
.wrap{max-width:980px;margin:0 auto;padding:22px}
.header{padding-top:28px;padding-bottom:8px}
.pill{
  display:inline-block;
  font-size:12px;
  color:var(--muted);
  border:1px solid var(--line);
  background:rgba(255,255,255,.03);
  padding:8px 12px;
  border-radius:999px;
}
h1{margin:14px 0 8px;font-size:38px;letter-spacing:.2px}
.sub{margin:0 0 18px;color:var(--muted);line-height:1.4}

.grid{display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:16px}
@media (max-width:860px){.grid{grid-template-columns:1fr}}

.card{
  border:1px solid var(--line);
  background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01));
  border-radius:16px;
  padding:18px;
}
.card h2{margin:0 0 10px;font-size:20px}
.muted{color:var(--muted);line-height:1.5}
.tip{margin-top:10px}
.note{
  margin-top:12px;
  border:1px dashed rgba(243,194,74,.35);
  background:rgba(243,194,74,.08);
  padding:10px 12px;
  border-radius:12px;
  color:#ffe7a7;
  font-size:13px;
}
.ctaRow{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}

.btn{
  border:1px solid var(--line);
  background:var(--btn);
  color:var(--text);
  padding:12px 14px;
  border-radius:14px;
  text-decoration:none;
  cursor:pointer;
  font-weight:600;
}
.btn.primary{
  background:linear-gradient(180deg, var(--accent), #d9a828);
  border-color:rgba(0,0,0,.2);
  color:#14130a;
}
.btn.ghost{background:rgba(255,255,255,.03)}
.btn.small{padding:10px 12px;border-radius:12px;font-size:14px}

.steps{margin:0;padding-left:18px}
.steps li{margin:8px 0;color:var(--muted)}
.codebox{
  border:1px solid var(--line);
  background:rgba(0,0,0,.22);
  padding:12px;
  border-radius:14px;
}
.label{font-size:12px;color:var(--muted);margin-bottom:6px}
.code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14px;word-break:break-all}

.dauGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:12px 0}
.dauStat{
  border:1px solid var(--line);
  background:rgba(0,0,0,.18);
  padding:12px;
  border-radius:14px;
}
.dauStat .k{font-size:12px;color:var(--muted)}
.dauStat .v{font-size:22px;margin-top:6px;font-weight:800}

.formRow{display:grid;grid-template-columns:140px 1fr;gap:10px;align-items:center;margin:10px 0}
@media (max-width:520px){.formRow{grid-template-columns:1fr}}
label{color:var(--muted);font-size:13px}
input{
  width:100%;
  padding:12px;
  border-radius:12px;
  border:1px solid var(--line);
  background:rgba(0,0,0,.25);
  color:var(--text);
  outline:none;
}

.tabs{display:flex;gap:8px;margin-top:10px}
.tab{
  padding:9px 10px;
  border-radius:12px;
  border:1px solid var(--line);
  background:rgba(255,255,255,.03);
  color:var(--muted);
  cursor:pointer;
  font-weight:700;
  font-size:13px;
}
.tab.active{color:#14130a;background:var(--accent);border-color:rgba(0,0,0,.2)}
.tabBody{margin-top:10px}
.hidden{display:none}

.template{border:1px solid var(--line);border-radius:14px;padding:12px;background:rgba(0,0,0,.18);margin-top:12px}
.tTitle{font-weight:800;margin-bottom:8px}
pre{
  margin:0;
  white-space:pre-wrap;
  background:rgba(0,0,0,.25);
  border:1px solid var(--line);
  padding:12px;
  border-radius:12px;
  color:var(--text);
}
.result{
  margin-top:10px;
  border:1px solid var(--line);
  background:rgba(0,0,0,.20);
  padding:12px;
  border-radius:12px;
  color:var(--muted);
}
.footer{padding-top:10px;padding-bottom:30px}
.tiny{font-size:12px}
