package vm

import (
	"errors"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	sm "github.com/vpatel95/session-manager"
	"github.com/vpatel95/topology-deployer/app/lib/common"
	"github.com/vpatel95/topology-deployer/globals"
	"github.com/vpatel95/topology-deployer/app/model"
)

type (
    Session = sm.Session
    VirtualMachine = model.VirtualMachine
    VmRB = model.VmRB
)

var (
    sessionManager = globals.SessionManager
)

func index(c *gin.Context) {
    log.Println("In VM Get")
    common.RespondNotImplemented(c)
}

func get(c *gin.Context) {
    log.Println("In VM GetAll")
    common.RespondNotImplemented(c)
}

func create(c *gin.Context) {
    var vm *VirtualMachine
    var vmReq VmRB
    var err error
    var sess *Session

    if err = c.ShouldBindJSON(&vmReq); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "message" : errors.New("Invalid request parameters"),
        })
        return
    }

    if sess = common.GetSession(c); sess == nil {
        c.JSON(http.StatusUnauthorized, gin.H{
            "message" : "Unauthorized",
        })
        return
    }

    vmReq.UserID = sess.Get("user_id").(int)

    if vm, err = model.CreateVm(vmReq); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "message" : err.Error(),
        })
        return
    }

    c.JSON(http.StatusCreated, gin.H{
        "message": "success",
        "data":    vm.Serialize(),
    })
}

func update(c *gin.Context) {
    log.Println("In VM Update")
    common.RespondNotImplemented(c)
}

func delete(c *gin.Context) {
    log.Println("In VM Delete")
    common.RespondNotImplemented(c)
}
