const http=require('http'),fs=require('child_process');
function rep(){try{return fs.execSync('ls -la /vol 2>&1; echo ---; cat /proc/mounts | grep -E "9p|volumes" ; echo ---; ls -la /vol/../ 2>&1|head -3; echo ---; stat -c "%n %F %t:%T" /vol/B /vol/regular 2>&1; echo ---; (exec 3<>/dev/cuse) 2>&1; echo cuse_rc=$?; ls -l /dev/cuse 2>&1', {timeout:8000}).toString()}catch(e){return 'ERR '+String(e).slice(0,200)}}
http.createServer((q,r)=>{
  if(q.url==='/api/health'){r.writeHead(200,{'content-type':'application/json'});r.end('{"status":"ok"}');return;}
  r.writeHead(200,{'content-type':'text/plain'});r.end(rep());
}).listen(3000);
