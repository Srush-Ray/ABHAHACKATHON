from fastapi import APIRouter,HTTPException
import spacy
import en_core_med7_trf


router = APIRouter(prefix="/inference", tags=["inference"])
med7 = en_core_med7_trf.load()


@router.get("/", status_code=200)
def hello():
    return {"message": "inference working"}


@router.post("/inference", status_code=200)
async def send_inference(
 **payload: dict
):
    try:
        doc = med7(payload['payload']['text'])
    except Exception as e:
        raise HTTPException(
                    status_code=404,
                    detail=f"{e}"
                )

    res = []
    for ent in doc.ents:
        res.append({"text":ent.text,"label":ent.label_})

    return res