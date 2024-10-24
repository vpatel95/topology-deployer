package topology

import (
	"errors"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	sm "github.com/vpatel95/session-manager"
	"github.com/vpatel95/topology-deployer/app/lib/common"
	"github.com/vpatel95/topology-deployer/app/model"
	"github.com/vpatel95/topology-deployer/globals"
)

type (
	Session  = sm.Session
	Topology = model.Topology
	User     = model.User
	Network  = model.Network
	VmResp   = model.VmResp
)

var (
	sessionManager = globals.SessionManager
)

func get(c *gin.Context) {
	var err error
	var topology *Topology
	var sess *Session

	if sess = common.GetSession(c); sess == nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": "failure",
			"data":   "Unauthorized",
		})
		return
	}

	id, _ := strconv.Atoi(c.Param("id"))
	if topology, err = model.GetTopologyByID(uint(id)); err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status": "failure",
			"data":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   topology,
	})
}

func create(c *gin.Context) {
	var topology Topology
	var err error
	var sess *Session

	if err := c.ShouldBindJSON(&topology); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "failure",
			"data":   errors.New("Invalid request parameters"),
		})
		return
	}

	if sess = common.GetSession(c); sess == nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": "failure",
			"data":   "Unauthorized",
		})
		return
	}

	topology.UserID = sess.Get("user_id").(int)

	if err = model.CreateTopology(topology); err != nil {
		log.Printf("Error creating topology : %v", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "failure",
			"data":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"status": "success",
		"data":   topology.Serialize(),
	})
}

func update(c *gin.Context) {
	log.Println("In Topology Update")
	common.RespondNotImplemented(c)
}

func delete(c *gin.Context) {
	var topology *Topology
	var sess *Session
	var err error

	if sess = common.GetSession(c); sess == nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": "failure",
			"data":   "Unauthorized",
		})
		return
	}

	topologyID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": "failure",
			"data":   "Invalid topology ID",
		})
		return
	}

	if topology, err = model.GetTopologyByID(uint(topologyID)); err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status": "failure",
			"data":   err.Error(),
		})
		return
	}

	if err := model.DeleteTopology(topology); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": "failure",
			"data":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   topology.Serialize(),
	})
}

func getVms(c *gin.Context) {
	var err error
	var topology *Topology
	var vms []VmResp

	id, _ := strconv.Atoi(c.Param("id"))
	if topology, err = model.GetTopologyByID(uint(id)); err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status": "failure",
			"data":   err.Error(),
		})
		return
	}

	if vms, err = topology.GetVms(); err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status": "failure",
			"data":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   vms,
	})
}

func getNw(c *gin.Context) {
	var err error
	var topology *Topology
	var nws []Network

	id, _ := strconv.Atoi(c.Param("id"))
	if topology, err = model.GetTopologyByID(uint(id)); err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status": "failure",
			"data":   err.Error(),
		})
		return
	}

	if nws, err = topology.GetNetworks(); err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status": "failure",
			"data":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   nws,
	})
}