document.addEventListener("DOMContentLoaded", () => {
	console.log("dom loaded");
		
//	const startRecording = async () => {
//		try {
//			const stream = await window.navigator.mediaDevices.getUserMedia({
//				audio: true,
//				video: { width: 300, height: 400 }
//			});
//			// getUserMedia의 결과물로 받은 스크림을 src로 지정
//			videoPreview.srcObject = stream;
//			console.log("success");
//		    
//			// 녹화하는 즉시 실시간으로 재생하게끔
//		    videoPreview.play();
//		  } catch (e) {
//			  console.log(e);
//		  }
//	};
	
	const handleBindData = (e)=>{
		const _camImg = document.querySelector(".camImg img");
		const { data } = e;
		
		_camImg.src = URL.createObjectURL(data);
	}
	
//	const startRecording = async () => {
//		const stream = await window.navigator.mediaDevices.getUserMedia({
//			video: { width: 300, height: 400 }
//		});
//		// getUserMedia의 결과물로 받은 스크림을 src로 지정
//		videoPreview.srcObject = stream;
//		const videoRecoder = new MediaRecorder(videoPreview.srcObject);
//		videoRecoder.start();
//		setTimeout(() => videoRecoder.stop(), 5000);
//		videoRecoder.addEventListener("dataavailable", handleBindData);
//	};
	
	let imageCapture;
	
	function drawCanvas(canvas, img) {
		  canvas.width = getComputedStyle(canvas).width.split('px')[0];
		  canvas.height = getComputedStyle(canvas).height.split('px')[0];
		  let ratio  = Math.min(canvas.width / img.width, canvas.height / img.height);
		  let x = (canvas.width - img.width * ratio) / 2;
		  let y = (canvas.height - img.height * ratio) / 2;
		  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
		  canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
		      x, y, img.width * ratio, img.height * ratio);
		}
	
	const _videoPreview = document.querySelector("#videoPreview");
	
	const startRecording = async () => {
		try{
			const stream = await window.navigator.mediaDevices.getUserMedia({
				video: true
			});
			
			// getUserMedia의 결과물로 받은 스크림을 src로 지정
			_videoPreview.srcObject = stream;
			_videoPreview.play();
		    const track = stream.getVideoTracks()[0];
		    imageCapture = new ImageCapture(track);
		}catch(e){
			console.log(e);
		}
	};
	
	const handleTake = async ()=>{
		try{
			 const blob = await imageCapture.takePhoto();
			 const imageBitmap = await createImageBitmap(blob);
			 const canvas = document.querySelector('.takePhotoCanvas');
			 drawCanvas(canvas, imageBitmap);
		}catch(e){
			console.log(e);
		}
	}
	
	function handleSave() {
		const canvas = document.querySelector('.takePhotoCanvas');
		const image = canvas.toDataURL("image/jpeg");
		const link = document.createElement("a");
		  link.download = image;
//		  link.href = image;  // 수정 -url
//		  link.download = "PaintJS[🎨]";  // 수정 -파일 이름
//		  link.click();
	}
	
	const _btnTake = document.querySelector("#take");
	const _btnSave = document.querySelector("#save");
	
	_btnTake.addEventListener("click",handleTake);
	_btnSave.addEventListener("click",handleSave);
	
	startRecording();
});