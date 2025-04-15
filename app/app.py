from fastapi import FastAPI
from routes.route import rrRouter
from fastapi.middleware.cors import CORSMiddleware

retailradar = FastAPI()
retailradar.include_router(rrRouter)

retailradar.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(retailradar, host='0.0.0.0', port=8000)
