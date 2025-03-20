from fastapi import FastAPI
from routes.route import rrRouter

retailradar = FastAPI()
retailradar.include_router(rrRouter)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(retailradar, host='0.0.0.0', port=8000)
