(()=>{"use strict";window.utils={getRandomNumber:(e,t)=>Math.floor(e+Math.random()*(t+1-e)),onModalOpenKeydown:e=>{"Escape"===e.key&&(e.preventDefault(),window.form.closeEditFormImg(),window.gallery.closeBigPhoto())}},window.debounce={debounce:e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}}},(()=>{const e="GET",t="POST",o="https://21.javascript.pages.academy/kekstagram/data",n="https://21.javascript.pages.academy/kekstagram",r=document.querySelector("#success").content.querySelector(".success"),l=document.querySelector("#error").content.querySelector(".error"),i=document.querySelector("main"),s=(e,t,o)=>(e.responseType="json",e.addEventListener("load",(function(){let n;switch(e.status){case 200:t(e.response);break;case 400:n="Неверный запрос";break;case 404:n="Ничего не найдено";break;case 500:n="Ошибка сервера";break;default:n=`Статус ответа: ${e.status} ${e.statusText}`}n&&o(n)})),e.addEventListener("error",(()=>{o("Произошла ошибка соединения")})),e.addEventListener("timeout",(()=>{o(`Запрос не успел выполниться за ${e.TIMEOUT}мс`)})),e.TIMEOUT=1e4,e),d=(e,t)=>{i.appendChild(e);const o=i.querySelector(`.${t}__button`),n=()=>{i.removeChild(e),document.removeEventListener("keydown",r)};o.addEventListener("click",n),document.addEventListener("click",n);const r=e=>{"Escape"===e.key&&n()};document.addEventListener("keydown",r)};window.backend={load:(t,n)=>{const r=new XMLHttpRequest;r.open(e,o),s(r,t,n),r.send()},send:function(e,o,r){const l=new XMLHttpRequest;l.open(t,n),s(l,o,r),l.send(e)},errorHandler:e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; padding: 20px; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},showMessageSuccess:()=>{const e=r.cloneNode(!0);e.querySelector("h2").textContent="Изображение успешно загружено",e.querySelector("button").textContent="Круто!",d(e,"success")},showMessagError:()=>{const e=l.cloneNode(!0);e.querySelector("h2").textContent="Ошибка загрузки файла",e.querySelector("button").textContent="Загрузить другой файл",d(e,"error")}}})(),(()=>{const e=document.querySelector(".pictures"),t=document.querySelector("#picture").content.querySelector(".picture");let o=[];const n=document.querySelector(".big-picture"),r=n.querySelector("#picture-cancel"),l=document.querySelector(".social__comments"),i=l.querySelector(".social__comment"),s=document.querySelector(".comments-loader");let d=[];const c=e=>{const o=t.cloneNode(!0);return o.querySelector(".picture__img").src=e.url,o.querySelector(".picture__likes").textContent=e.likes,o.querySelector(".picture__comments").textContent=e.comments.length,o};window.backend.load((e=>{o=e,f(o)}),(e=>{window.backend.errorHandler(e)}));const a=e=>{const t=i.cloneNode(!0);return t.querySelector(".social__picture").src=e.avatar,t.querySelector(".social__picture").alt=e.name,t.querySelector(".social__text").textContent=e.message,t},u=e=>{const t=document.createDocumentFragment();for(let o of e)t.appendChild(a(o));return t};let m;const w=()=>{var e;m+=5,e=d.slice(m-5,m),l.appendChild(u(e)),m>=d.length&&(s.removeEventListener("click",v),s.classList.add("hidden"))},v=()=>{w()},p=e=>{n.classList.remove("hidden"),r.addEventListener("click",y),document.addEventListener("keydown",window.utils.onModalOpenKeydown),document.querySelector("body").classList.add("modal-open"),s.addEventListener("click",v),l.innerHTML="",(e=>{n.querySelector(".big-picture__img img").src=e.url,n.querySelector(".likes-count").textContent=e.likes,n.querySelector(".social__caption").textContent=e.description,n.querySelector(".comments-count").textContent=e.comments.length,n.querySelector(".social__comment-count").classList.add("hidden"),n.querySelector(".comments-loader").classList.add("hidden"),n.querySelector(".social__comments").childNodes.forEach((e=>e.remove())),u(e.comments)})(e),e.comments.length>5&&s.classList.remove("hidden"),d=e.comments.slice(),m=0,w()},y=()=>{n.classList.add("hidden"),r.removeEventListener("click",y),document.removeEventListener("keydown",window.utils.onModalOpenKeydown),document.querySelector("body").classList.remove("modal-open")},f=t=>{g(),e.append((e=>{const t=document.createDocumentFragment();for(let o=0;o<e.length;o++){const n=e[o],r=c(n);t.appendChild(r),r.addEventListener("click",(e=>{e.preventDefault(),p(n)})),r.addEventListener("keydown",(e=>{"Enter"===e.key&&(e.preventDefault(),p(n))}))}return t})(t))},g=()=>document.querySelectorAll(".picture").forEach((e=>e.remove()));window.gallery={getPictures:()=>o.slice(),renderPhotos:f,closeBigPhoto:y}})(),(()=>{const e="100%",t=document.querySelector(".img-upload__form"),o=t.querySelector(".img-upload__preview").querySelector("img"),n=t.querySelector(".scale"),r=n.querySelector(".scale__control--smaller"),l=n.querySelector(".scale__control--value"),i=n.querySelector(".scale__control--bigger"),s=t.querySelector(".effect-level"),d=s.querySelector(".effect-level__pin"),c=document.querySelectorAll(".effects__radio"),a=()=>parseInt(l.value,10),u=e=>{const t=(n=e,Math.min(100,Math.max(25,n)));var n;l.value=t+"%",o.style.transform=`scale(${t/100})`},m=e=>{Array.from(o.classList).forEach((e=>{e.match("effects__preview--")&&o.classList.remove(e)})),o.classList.add(e)},w=e=>{switch(e.target.id){case"effect-none":m("effects__preview--none");break;case"effect-chrome":m("effects__preview--chrome");break;case"effect-sepia":m("effects__preview--sepia");break;case"effect-marvin":m("effects__preview--marvin");break;case"effect-phobos":m("effects__preview--phobos");break;case"effect-heat":m("effects__preview--heat")}};c.forEach((e=>{e.addEventListener("click",w)})),window.editor={uploadFormImg:t,previewImg:o,scaleControlSmaller:r,currentScaleValue:l,scaleControlBigger:i,effectBar:s,effectLevelPin:d,onScaleValuePressingButtonSmaller:()=>{u(a()-25)},onScaleValuePressingButtonBigger:()=>{u(a()+25)},onEditFormImgChange:t=>{t.target.matches('input[type="radio"]')&&(o.style.filter="",t.target.matches('input[value="none"]')?s.classList.add("hidden"):(s.classList.remove("hidden"),window.slider.effectLevelPin.style.left=e,window.slider.effectLevelDepth.style.width=e))}}})(),(()=>{const e={MIN_LENGTH:2,MAX_LENGTH:20,MAX_QUANTITY:5,REGISTER:/^#[а-яА-Яa-zA-Z0-9]*$/},t=window.editor.uploadFormImg.querySelector(".text__hashtags"),o=window.editor.uploadFormImg.querySelector(".text__description"),n=(e,t)=>{const o=e.indexOf(t)+1;return e.indexOf(t,o)};t.addEventListener("focus",(()=>{document.removeEventListener("keydown",window.gallery.onModalOpenKeydown)})),t.addEventListener("blur",(()=>{document.addEventListener("keydown",window.gallery.onModalOpenKeydown)})),o.addEventListener("focus",(()=>{document.removeEventListener("keydown",window.gallery.onModalOpenKeydown)})),o.addEventListener("blur",(()=>{document.addEventListener("keydown",window.gallery.onModalOpenKeydown)})),window.validation={hashtagsInput:t,onHashtagsInput:o=>{(o=>{for(let r of o)"#"!==r[0]?t.setCustomValidity("Хэш-тег начинается с символа # (решётка)"):r.length<e.MIN_LENGTH?t.setCustomValidity(`Хэш-тег не может состоять только из одной решётки. Ещё минимум ${e.MIN_LENGTH-r.length} симв.`):e.REGISTER.test(r)?r.length>e.MAX_LENGTH?t.setCustomValidity(`Максимальная длина одного хэш-тега ${e.MAX_LENGTH} символов, включая решётку. Удалите лишние ${r.length-e.MAX_LENGTH} симв.`):-1!==n(o,r)?t.setCustomValidity("Один и тот же хэш-тег не может быть использован дважды"):t.setCustomValidity(""):t.setCustomValidity("Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д."),t.reportValidity();o.length>e.MAX_QUANTITY&&t.setCustomValidity(`Нельзя указать больше ${e.MAX_QUANTITY} хэш-тегов`),t.validity.valid?t.style.outlineColor="black":t.style.outlineColor="red"})(o.target.value.toLowerCase().split(" "))}}})(),(()=>{const e=window.editor.uploadFormImg.querySelector("#upload-file"),t=window.editor.uploadFormImg.querySelector(".img-upload__overlay"),o=window.editor.uploadFormImg.querySelector("#upload-cancel"),n=()=>{t.classList.add("hidden"),document.removeEventListener("keydown",window.utils.onModalOpenKeydown),e.value="",window.validation.hashtagsInput.value="",window.editor.scaleControlSmaller.removeEventListener("click",window.editor.onScaleValuePressingButtonSmaller),window.editor.scaleControlBigger.removeEventListener("click",window.editor.onScaleValuePressingButtonBigger),t.removeEventListener("change",window.editor.onEditFormImgChange),window.validation.hashtagsInput.removeEventListener("input",window.validation.onHashtagsInput),document.querySelector("body").classList.remove("modal-open"),o.removeEventListener("click",n),window.editor.effectLevelPin.removeEventListener("mousedown",window.slider.onMouseDown),window.editor.uploadFormImg.removeEventListener("submit",l),r()},r=()=>{window.editor.previewImg.className="",window.editor.previewImg.style.transform="",window.editor.uploadFormImg.reset()};e.addEventListener("change",(e=>{e.preventDefault(),t.classList.remove("hidden"),document.addEventListener("keydown",window.utils.onModalOpenKeydown),document.querySelector("body").classList.add("modal-open"),window.editor.currentScaleValue.value="100%",window.editor.scaleControlSmaller.addEventListener("click",window.editor.onScaleValuePressingButtonSmaller),window.editor.scaleControlBigger.addEventListener("click",window.editor.onScaleValuePressingButtonBigger),t.addEventListener("change",window.editor.onEditFormImgChange),window.editor.effectBar.classList.add("hidden"),window.validation.hashtagsInput.addEventListener("input",window.validation.onHashtagsInput),o.addEventListener("click",n),window.editor.effectLevelPin.addEventListener("mousedown",window.slider.onMouseDown),window.editor.uploadFormImg.addEventListener("submit",l),window.uploadFile.onfileUpload()}));const l=e=>{e.preventDefault(),window.backend.send(new FormData(window.editor.uploadFormImg),window.backend.showMessageSuccess,window.backend.showMessagError),n()};window.form=n})(),(()=>{const e={chrome:{min:0,max:1,template:"grayscale({value})"},sepia:{min:0,max:1,template:"sepia({value})"},marvin:{min:0,max:100,template:"invert({value}%)"},phobos:{min:0,max:3,template:"blur({value}px)"},heat:{min:1,max:3,template:"brightness({value})"}},t=document.querySelector(".effect-level"),o=t.querySelector(".effect-level__value"),n=t.querySelector(".effect-level__line"),r=t.querySelector(".effect-level__pin"),l=t.querySelector(".effect-level__depth");window.slider={effectLevelValue:o,effectLevelPin:r,effectLevelDepth:l,onMouseDown:t=>{t.preventDefault();let i=t.clientX;const s=t=>{t.preventDefault();const s=i-t.clientX;i=t.clientX;const d=r.offsetLeft-s,c=n.offsetWidth;if(!(d<0||d>c)){const t=100*d/c;r.style.left=d+"px",o.setAttribute("value",Math.round(t)),l.style.width=Math.round(t)+"%",(t=>{if("none"!==t.value){const n=e[t.value].min,r=e[t.value].max,l=e[t.value].template,i=n+(r-n)/100*o.value;window.editor.previewImg.style="filter: "+l.replace("{value}",i)}else window.editor.previewImg.style=null})(document.querySelector("input[name=effect]:checked"))}},d=function(e){e.preventDefault(),document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",d)};document.addEventListener("mousemove",s),document.addEventListener("mouseup",d)}}})(),(()=>{const e=document.querySelector(".img-filters"),t={"filter-default":e=>e.slice(),"filter-random":e=>(e=>{for(let t=e.length-1;t>0;t--){const o=Math.floor(Math.random()*(t+1)),n=e[o];e[o]=e[t],e[t]=n}return e})(e.slice().splice(0,10)),"filter-discussed":e=>e.slice().sort(((e,t)=>t.comments.length-e.comments.length))},o=window.debounce.debounce((o=>{var n;n=o.target,e.querySelector(".img-filters__button--active").classList.remove("img-filters__button--active"),n.classList.add("img-filters__button--active");const r=(0,t[o.target.id])(window.gallery.getPictures());window.gallery.renderPhotos(r)}));e.classList.remove("img-filters--inactive"),e.addEventListener("click",o)})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector("#upload-file[type=file]"),o=document.querySelector(".img-upload__preview").querySelector("img"),n=document.querySelectorAll(".effects__preview");window.uploadFile={onfileUpload:()=>{const r=t.files[0],l=r.name.toLowerCase();if(e.some((e=>l.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{o.src=e.result,n.forEach((t=>{t.style.backgroundImage=`url("${e.result}")`}))})),e.readAsDataURL(r)}}}})()})();